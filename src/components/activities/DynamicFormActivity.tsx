import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Check } from 'lucide-react';

type FieldType = 'short_text' | 'long_text' | 'select' | 'multi_select' | '4_point_scale' | 'file_upload' | 'date';

interface Field {
  id: string;
  type: FieldType;
  label: string;
  options?: string[];
  placeholder?: string;
}

export interface DynamicFormActivityProps {
  activityId?: string;
  fields?: Field[];
}

export const DynamicFormActivity: React.FC<DynamicFormActivityProps> = ({
  activityId,
  fields = []
}) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load existing data
  useEffect(() => {
    if (!activityId) {
      setLoading(false);
      return;
    }
    
    fetch(`/api/activities/resume?activityId=${activityId}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.data) {
          setData(resData.data);
        }
      })
      .catch(err => console.error("Failed to load activity data", err))
      .finally(() => setLoading(false));
  }, [activityId]);

  // Autosave logic
  const saveToServer = useCallback(async (newData: Record<string, any>) => {
    if (!activityId) return;
    setSaveStatus('saving');
    
    try {
      await fetch('/api/activities/autosave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId,
          data: newData
        })
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      console.error("Autosave failed", e);
      setSaveStatus('idle');
    }
  }, [activityId]);

  const handleChange = (id: string, value: any) => {
    const newData = { ...data, [id]: value };
    setData(newData);
    
    // Simple debounce approach inside the component (a proper hook is better for prod)
    saveToServer(newData);
  };

  const handleMultiSelect = (id: string, option: string) => {
    const currentSelected = data[id] || [];
    let newSelected;
    if (currentSelected.includes(option)) {
      newSelected = currentSelected.filter((item: string) => item !== option);
    } else {
      newSelected = [...currentSelected, option];
    }
    handleChange(id, newSelected);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-[#14BAA9]" /></div>;
  }

  return (
    <div className="space-y-8">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block font-bold text-[#17324d] text-lg mb-3">
            {field.label}
          </label>
          
          {field.type === 'short_text' && (
            <input
              type="text"
              value={data[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#14BAA9] focus:ring-0 transition-colors outline-none"
            />
          )}

          {field.type === 'long_text' && (
            <textarea
              value={data[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#14BAA9] focus:ring-0 transition-colors outline-none resize-y"
            />
          )}

          {field.type === 'select' && (
            <select
              value={data[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#14BAA9] focus:ring-0 transition-colors outline-none bg-white"
            >
              <option value="" disabled>Select an option</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {field.type === 'multi_select' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field.options?.map((opt, i) => {
                const isSelected = (data[field.id] || []).includes(opt);
                return (
                  <button
                    key={i}
                    onClick={() => handleMultiSelect(field.id, opt)}
                    className={`p-4 rounded-xl text-left border-2 transition-all ${
                      isSelected 
                        ? 'border-[#14BAA9] bg-[#f1fffb] text-[#12304a]' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#14BAA9] border-[#14BAA9]' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {field.type === '4_point_scale' && (
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border-2 border-slate-200">
              {field.options?.map((opt, i) => {
                const isSelected = data[field.id] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => handleChange(field.id, opt)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                      isSelected ? 'text-[#14BAA9]' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#14BAA9] bg-[#14BAA9]' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-bold text-center">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

        </div>
      ))}
      
      {/* Autosave Indicator */}
      <div className="flex justify-end pt-4">
        <div className="text-sm font-medium flex items-center gap-2">
          {saveStatus === 'saving' && <span className="text-slate-400 animate-pulse">Saving...</span>}
          {saveStatus === 'saved' && <span className="text-green-500 flex items-center gap-1"><Check className="w-4 h-4" /> Saved</span>}
        </div>
      </div>
    </div>
  );
};
