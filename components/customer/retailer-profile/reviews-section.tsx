import type { RatingBreakdown, RetailerReview } from "@/lib/data/reviews";
import { StarRating } from "@/components/ui/star-rating";
import { EmptyState, EmptyStatePresets } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";

export function RetailerReviewsSection({ breakdown, reviews }: { breakdown: RatingBreakdown; reviews: RetailerReview[] }) {
  return (
    <section className="px-5 py-16 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-[340px] lg:shrink-0">
          <h2 className="font-display text-[32px] text-primary-600">Customer Reviews</h2>
          <div className="flex items-baseline gap-3">
            <p className="text-5xl font-bold text-ink-900">{breakdown.average.toFixed(1)}</p>
            <div>
              <StarRating value={breakdown.average} size="sm" />
              <p className="mt-0.5 text-sm text-ink-700">Based on {breakdown.total.toLocaleString("en-IN")} ratings</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {breakdown.distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span className="w-3 text-[13px] text-ink-700">{d.stars}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-300">
                  <div className="h-full bg-primary-600" style={{ width: `${d.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {reviews.length === 0 ? (
            <EmptyState {...EmptyStatePresets.noReviews} />
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-cream-300 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-ink-900">{review.author}</p>
                  <p className="text-[13px] text-ink-500">{formatDate(review.createdAt)}</p>
                </div>
                <StarRating value={review.rating} size="xs" className="mt-1.5" />
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{review.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
