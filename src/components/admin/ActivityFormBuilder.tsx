'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

export type FieldType = 'short_text' | 'long_text' | 'select' | 'multi_select' | '4_point_scale';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface ActivityPayload {
  fields: FormField[];
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'short_text', label: 'Short Text' },
  { value: 'long_text', label: 'Long Text' },
  { value: 'select', label: 'Select (Dropdown)' },
  { value: 'multi_select', label: 'Multi-Select (Checkboxes)' },
  { value: '4_point_scale', label: '4-Point Scale' },
];

export const ActivityFormBuilder = ({ 
  initialPayload, 
  onChange 
}: { 
  initialPayload: string; 
  onChange: (payload: string) => void;
}) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Parse initial payload on mount
  useEffect(() => {
    try {
      if (!initialPayload) {
        setFields([]);
        return;
      }
      const parsed = JSON.parse(initialPayload) as ActivityPayload;
      if (parsed && Array.isArray(parsed.fields)) {
        setFields(parsed.fields);
      } else {
        setFields([]);
      }
    } catch (e) {
      console.error("Failed to parse activity payload:", e);
      setError("Invalid JSON format in database.");
    }
  }, [initialPayload]);

  // Update parent whenever fields change
  const notifyChange = (newFields: FormField[]) => {
    setFields(newFields);
    onChange(JSON.stringify({ fields: newFields }));
  };

  const addField = () => {
    const newField: FormField = {
      id: `new.field.${Date.now()}`,
      type: 'short_text',
      label: 'New Question'
    };
    notifyChange([...fields, newField]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    notifyChange(newFields);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    notifyChange(newFields);
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === fields.length - 1) return;

    const newFields = [...fields];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[swapIndex]] = [newFields[swapIndex], newFields[index]];
    
    notifyChange(newFields);
  };

  const updateFieldOptions = (index: number, optionsStr: string) => {
    const options = optionsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    updateField(index, { options });
  };

  if (error) {
    return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {fields.length === 0 && (
        <div className="text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-500 text-sm">
          No fields in this activity yet. Click below to add one.
        </div>
      )}

      {fields.map((field, index) => {
        const needsOptions = ['select', 'multi_select', '4_point_scale'].includes(field.type);
        
        return (
          <div key={`${field.id}-${index}`} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex group">
            
            {/* Left Actions Bar */}
            <div className="w-10 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-2 gap-1">
              <button 
                type="button" 
                onClick={() => moveField(index, 'up')}
                disabled={index === 0}
                className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <div className="flex-1 flex items-center justify-center opacity-30">
                <GripVertical className="w-4 h-4" />
              </div>
              <button 
                type="button" 
                onClick={() => moveField(index, 'down')}
                disabled={index === fields.length - 1}
                className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 flex-1 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Field Label / Question</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    placeholder="e.g., What is your favorite color?"
                    className="w-full text-sm font-semibold border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none pb-1 transition-colors bg-transparent"
                  />
                </div>
                
                <button 
                  type="button"
                  onClick={() => removeField(index)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Field"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, { type: e.target.value as FieldType })}
                    className="w-full text-sm p-2 rounded-md border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    {FIELD_TYPES.map(ft => (
                      <option key={ft.value} value={ft.value}>{ft.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unique ID (for data storage)</label>
                  <input
                    type="text"
                    value={field.id}
                    onChange={(e) => updateField(index, { id: e.target.value.replace(/[^a-zA-Z0-9_.-]/g, '') })}
                    className="w-full text-sm p-2 rounded-md border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white font-mono"
                  />
                </div>

                {!needsOptions && (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placeholder (Optional)</label>
                    <input
                      type="text"
                      value={field.placeholder || ''}
                      onChange={(e) => updateField(index, { placeholder: e.target.value })}
                      placeholder="e.g., Type your answer here..."
                      className="w-full text-sm p-2 rounded-md border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                )}

                {needsOptions && (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Options (Comma separated)</label>
                    <input
                      type="text"
                      value={field.options ? field.options.join(', ') : ''}
                      onChange={(e) => updateFieldOptions(index, e.target.value)}
                      placeholder="e.g., Apple, Banana, Orange"
                      className="w-full text-sm p-2 rounded-md border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addField}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold text-sm"
      >
        <Plus className="w-4 h-4" />
        Add New Field
      </button>
    </div>
  );
};
