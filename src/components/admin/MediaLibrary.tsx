'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Copy, Check, ExternalLink, Loader2, RefreshCw } from 'lucide-react';

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  storageKey?: string;
  mimeType?: string;
  size?: number;
  createdAt?: string | number;
}

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  selectionMode?: boolean;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectImage, selectionMode = false }) => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      }
    } catch (err) {
      console.error('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(`Uploading ${files.length} file(s)...`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          if (result.asset) {
            setAssets(prev => [result.asset, ...prev]);
            if (selectionMode && onSelectImage && i === 0) {
              onSelectImage(result.asset.url);
            }
          }
        }
      } catch (err) {
        console.error('Upload failed for file:', file.name, err);
      }
    }

    setUploading(false);
    setUploadProgress('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAssets(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete asset:', err);
    }
  };

  const copyToClipboard = (url: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 transition-colors rounded-2xl p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shadow-inner">
          {uploading ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <UploadCloud className="w-7 h-7" />
          )}
        </div>
        <div>
          <p className="text-base font-bold text-slate-800">
            {uploading ? uploadProgress : 'Drop workshop & event photos here, or click to browse'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Supports JPG, PNG, WebP, GIF (stored in Cloudflare R2)
          </p>
        </div>
      </div>

      {/* Header & Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-bold text-slate-800">
            Media Library ({assets.length} photos)
          </h3>
        </div>
        <button
          onClick={fetchAssets}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Grid */}
      {loading && assets.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">No images uploaded yet</p>
          <p className="text-xs text-slate-400 mt-1">Upload your first workshop photos above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => {
                if (selectionMode && onSelectImage) {
                  onSelectImage(asset.url);
                } else {
                  setPreviewImage(asset.url);
                }
              }}
              className={`group relative rounded-xl overflow-hidden border bg-white shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer ${
                selectionMode ? 'hover:border-teal-500 hover:ring-2 hover:ring-teal-200' : 'border-slate-200'
              }`}
            >
              <div className="aspect-square w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={asset.url}
                  alt={asset.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard(asset.url, asset.id, e)}
                    className="p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm hover:scale-110 transition-transform"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(asset.url, '_blank');
                    }}
                    className="p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm hover:scale-110 transition-transform"
                    title="Open Full Image"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(asset.id, e)}
                    className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:scale-110 transition-transform"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-slate-700 truncate" title={asset.filename}>
                  {asset.filename}
                </p>
                {asset.size && (
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatSize(asset.size)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Full preview"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
