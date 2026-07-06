import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Pencil } from "lucide-react";



export function EditableField({ 
    label, 
    field, 
    value, 
    type = 'text', 
    rows = 2, 
    isEditing, 
    editField, 
    setEditField, 
    tempData, 
    setTempData 
  }) {
    const isActive = editField === field;
  
    return (
      <div className="group relative">
        {isEditing && (
          <button
            onClick={() => setEditField(isActive ? null : field)}
            className="absolute -left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        {isEditing && isActive ? (
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
            {type === 'textarea' ? (
              <Textarea
                value={tempData[field]}
                onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl resize-none"
                rows={rows}
              />
            ) : (
              <Input
                value={tempData[field]}
                onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
                className="border-white/10 bg-white/5 text-white focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl"
              />
            )}
          </div>
        ) : (
          <div className="relative">
            {typeof value === 'string' && value.startsWith('/images') ? (
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#1B2B4B]/50 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  {value}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 rounded-full bg-white/10 p-2 text-white/60 hover:bg-white/20 hover:text-white transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-white/90">{value}</div>
            )}
          </div>
        )}
      </div>
    );
  }