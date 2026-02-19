import React, { useState } from 'react';
import { StarIcon, CameraIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

const FLAVOR_OPTIONS = [
  'Earthy', 'Woody', 'Spicy', 'Creamy', 'Leathery', 'Nutty',
  'Sweet', 'Peppery', 'Cocoa', 'Coffee', 'Cedar', 'Floral',
  'Herbal', 'Toasty', 'Vanilla', 'Dried Fruit', 'Mineral', 'Smoky',
];

const VITOLA_OPTIONS = [
  'Robusto', 'Toro', 'Churchill', 'Corona', 'Lancero',
  'Gordo', 'Petit Corona', 'Belicoso', 'Torpedo', 'Figurado',
];

interface JournalFormProps {
  onSubmit?: (entry: any) => void;
  onCancel?: () => void;
}

export default function JournalForm({ onSubmit, onCancel }: JournalFormProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [vitola, setVitola] = useState('');
  const [rating, setRating] = useState(0);
  const [flavorNotes, setFlavorNotes] = useState<string[]>([]);
  const [pairing, setPairing] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const toggleFlavor = (flavor: string) => {
    setFlavorNotes((prev) =>
      prev.includes(flavor) ? prev.filter((f) => f !== flavor) : [...prev, flavor]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name, brand, vitola, rating, flavorNotes, pairing, location, notes, photo,
      date: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cigar-text">Log a Cigar</h2>
        {onCancel && (
          <button type="button" onClick={onCancel} className="p-2 text-cigar-text-secondary">
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Photo upload */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Photo</label>
        <div className="relative">
          {photo ? (
            <div className="relative rounded-2xl overflow-hidden">
              <img src={photo} alt="Cigar" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          ) : (
            <label className="card flex flex-col items-center justify-center h-36 cursor-pointer border-2 border-dashed border-cigar-border hover:border-cigar-accent transition-colors">
              <CameraIcon className="w-8 h-8 text-cigar-text-secondary mb-2" />
              <span className="text-sm text-cigar-text-secondary">Tap to add photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Cigar name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Cigar Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Padrón 1964 Anniversary"
          className="input-field"
          required
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g. Padrón"
          className="input-field"
        />
      </div>

      {/* Vitola */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Vitola</label>
        <div className="flex flex-wrap gap-2">
          {VITOLA_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVitola(vitola === v ? '' : v)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                vitola === v
                  ? 'bg-cigar-accent text-cigar-bg font-medium'
                  : 'bg-cigar-bg border border-cigar-border text-cigar-text-secondary'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Star rating */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 transition-transform active:scale-110"
            >
              {star <= rating ? (
                <StarIcon className="w-10 h-10 text-cigar-star" />
              ) : (
                <StarOutline className="w-10 h-10 text-cigar-border" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor notes */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">
          Flavor Notes
        </label>
        <div className="flex flex-wrap gap-2">
          {FLAVOR_OPTIONS.map((flavor) => (
            <button
              key={flavor}
              type="button"
              onClick={() => toggleFlavor(flavor)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                flavorNotes.includes(flavor)
                  ? 'bg-cigar-accent text-cigar-bg font-medium'
                  : 'bg-cigar-bg border border-cigar-border text-cigar-text-secondary'
              }`}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      {/* Pairing */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Pairing</label>
        <input
          type="text"
          value={pairing}
          onChange={(e) => setPairing(e.target.value)}
          placeholder="e.g. Macallan 12, Espresso"
          className="input-field"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Location</label>
        <div className="relative">
          <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cigar-text-secondary" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where did you smoke?"
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-2 text-sm font-medium text-cigar-text-secondary">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was the experience?"
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn-primary w-full text-lg py-4">
        Save Entry
      </button>
    </form>
  );
}
