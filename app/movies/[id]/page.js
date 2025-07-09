'use client'
import React, { useEffect, useState } from 'react';
import { Star, MessageCircle, Play, Heart, Share2, Clock, Calendar, Copy } from 'lucide-react';
import { useParams } from 'next/navigation';

const StarRating = ({ rating, totalRatings }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < fullStars
              ? 'text-yellow-400 fill-yellow-400'
              : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-300'
              } transition-colors duration-200`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({totalRatings.toLocaleString()})
      </span>
    </div>
  );
};

export default function MovieCard() {
  const { id } = useParams();
  const [openComments, setopenComments] = useState(false);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [copied, setCopied] = useState(null);
  const averageRating = (
    reviews.reduce((sum, r) => sum + parseFloat(r.rating), 0) / reviews.length
  ).toFixed(1);

  useEffect(() => {
    if (movie?.reviews) {
      setReviews(movie.reviews);
    }
  }, [movie]);

  const handleNewReview = (review) => {
    setReviews((prev) => [review, ...prev]);
  };
  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;

      setIsLoading(true);
      try {
        const res = await fetch(`/api/movie/${id}`);
        const data = await res.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  function ReviewForm({ movieId, onNewReview }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!rating) return alert('Please provide a rating.');

      try {
        setLoading(true);
        const res = await fetch(`/api/movie/${movieId}/review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating, comment }),
        });
        const data = await res.json();
        if (res.ok) {
          onNewReview(data);
          setRating('');
          setComment('');
        } else {
          alert(data.error || 'err');
        }
      } catch (err) {
        console.error('Submit error:', err);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-white mb-1">Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20"
            placeholder="Enter a rating from 0 to 10"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white/70 border border-white/20"
            placeholder="Join the conversation and share your thoughts about this movie."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Sending...' : 'Submit Review'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setopenComments(!openComments)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 mx-2 rounded cursor-pointer"
        >
          {openComments ? 'Close' : 'Open Reviews'}
        </button>
      </form>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <div className="md:flex">
            <div className="md:w-1/3 relative group">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors duration-200">
                    <Play size={32} className="text-white ml-1" fill="white" />
                  </div>
                </button>
              </div>
            </div>

            <div className="md:w-2/3 p-8 text-white">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      {movie.title}
                      <span className="ml-3 text-lg bg-purple-600/30 px-3 py-1 rounded-full text-xs font-medium">
                        PG-13
                      </span>
                    </h1>
                    <h2 className="text-xl text-purple-200 mb-4">The Battle of the Five Armies</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-all duration-200 ${isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      <Heart size={20} fill={isLiked ? 'white' : 'none'} />
                    </button>
                    <button className="cursor-pointer p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200">
                      {!copied && (
                        <Share2
                          size={20} onClick={() => { navigator.clipboard.writeText(window.location.href), <span>Copied</span>, setCopied(true), setTimeout(() => setCopied(false), 2000); }} />)}
                      <span>{copied ? <Copy size={20}></Copy> : ''}</span>

                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-purple-200 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{movie.duration} min</span>
                  </div>
                </div>

                <StarRating rating={averageRating} totalRatings={movie.reviews.length} />
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {['Action', 'Fantasy', 'Adventure'].map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-4 py-2 rounded-full text-sm font-medium border border-purple-400/30 hover:border-purple-400/50 transition-colors duration-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-purple-200">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-purple-200">Cast</h3>
                <div className="flex space-x-4">
                  {[
                    { name: "Martin Freeman", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" },
                    { name: "Ian McKellen", avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" },
                    { name: "Richard Armitage", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100" }
                  ].map((actor, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/30 group-hover:border-purple-400 transition-colors duration-200">
                        <img
                          src={actor.avatar}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-400 mt-2 text-center group-hover:text-white transition-colors duration-200">
                        {actor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle size={20} className="text-purple-400" />
                  <h3 className="text-lg font-semibold text-purple-200">
                    Reviews ({movie.reviews ? movie.reviews.length : 0})
                  </h3>
                </div>
                <ReviewForm movieId={id} onNewReview={handleNewReview} />
                {openComments && (
                  <div className="mt-6 space-y-4">
                    {reviews.map((rev, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-3 text-sm text-gray-200 border border-white/10">
                        <div className="font-semibold text-purple-300 mb-1">Rating: {rev.rating}</div>
                        {rev.comment && (
                          <div className='flex justify-between'>
                            <p>{rev.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(rev.createdAt).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}
                            </p>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>)}
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                  <Play size={20} fill="white" />
                  <span>Watch Now</span>
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}