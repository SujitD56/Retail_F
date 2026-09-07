import type { Review } from "@/types";
import type { RatingBreakdown } from "@/lib/data/reviews";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { EmptyState, EmptyStatePresets } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";

export function ReviewsPanel({ breakdown, reviews }: { breakdown: RatingBreakdown; reviews: Review[] }) {
  return (
    <section className="border-y border-cream-300 bg-white px-5 py-16 sm:px-10 lg:px-20">
      <h2 className="font-display text-3xl text-primary-600">Customer Reviews</h2>
      <div className="mt-10 flex flex-col gap-12 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-[340px] lg:shrink-0">
          <div>
            <p className="text-5xl font-bold text-ink-900">{breakdown.average.toFixed(1)}</p>
            <StarRating value={breakdown.average} size="sm" className="mt-1" />
            <p className="mt-1 text-sm text-ink-700">Based on {breakdown.total} verified ratings</p>
          </div>
          <div className="flex flex-col gap-2">
            {breakdown.distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span className="w-[30px] text-[13px] text-ink-700">{d.stars} ★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-300">
                  <div className="h-full bg-primary-600" style={{ width: `${d.percent}%` }} />
                </div>
                <span className="w-10 text-right text-[13px] text-ink-500">{d.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {reviews.length === 0 ? (
            <EmptyState {...EmptyStatePresets.noReviews} />
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-cream-300 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold text-ink-900">{review.author}</p>
                    {review.verified && (
                      <Badge variant="success" className="bg-[#e2ece9] text-[9px] text-[#1e5c49] normal-case">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <p className="text-[13px] text-ink-500">{formatDate(review.createdAt)}</p>
                </div>
                <StarRating value={review.rating} size="xs" className="mt-2" />
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{review.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
