import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WishFormProps {
  onSubmit: () => void;
}

export function WishForm({ onSubmit }: WishFormProps) {
  const [wishText, setWishText] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const maxLength = 200;
  const remainingChars = maxLength - wishText.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (wishText.trim().length === 0) {
      setError('Please enter your wish');
      return;
    }

    if (wishText.length > maxLength) {
      setError(`Wish must be ${maxLength} characters or less`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('christmas_wishes')
        .insert([
          {
            wish_text: wishText.trim(),
            is_public: isPublic,
          },
        ]);

      if (insertError) throw insertError;

      onSubmit();
    } catch (err) {
      setError('Failed to submit wish. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-red-200"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-red-700 mb-2">
            Make a Christmas Wish
          </h1>
          <p className="text-gray-600 text-lg">
            Share your heart's desire this festive season
          </p>
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="wish"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              What's your Christmas wish?
            </label>
            <textarea
              id="wish"
              value={wishText}
              onChange={(e) => {
                setWishText(e.target.value);
                setError('');
              }}
              placeholder="I wish for..."
              rows={5}
              maxLength={maxLength}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg resize-none"
              autoFocus
            />
            <div className="flex justify-between items-center mt-2">
              <p
                className={`text-sm ${
                  remainingChars < 20 ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {remainingChars} characters remaining
              </p>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Allow my wish to be seen by others (Anonymous)
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Your wish will be displayed on the public Christmas Wishes
                  Wall. All wishes are completely anonymous.
                </p>
              </div>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || wishText.trim().length === 0}
            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-2 ${
              isSubmitting || wishText.trim().length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-green-600 text-white hover:shadow-xl'
            }`}
          >
            <Send size={24} />
            {isSubmitting ? 'Sending...' : 'Send My Wish'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
