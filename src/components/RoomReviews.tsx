import { copy, type Language } from "@/content";
import type { Review } from "@/reviews";

// Guest reviews inside a room card. Renders nothing until real reviews exist for that room.
export default function RoomReviews({ language, reviews }: { language: Language; reviews: Review[] }) {
  const t = copy[language];
  if (reviews.length === 0) return null;
  return <div className="room-reviews"><p className="room-reviews-title">{t.reviewsTitle}</p>{reviews.map((review) => <figure className="room-review" key={`${review.author}-${review.quote.slice(0, 24)}`}>{review.rating && <p className="review-stars" role="img" aria-label={t.ratingLabel.replace("{n}", String(review.rating))}>{"★".repeat(review.rating)}<span aria-hidden="true">{"★".repeat(5 - review.rating)}</span></p>}<blockquote><p>“{review.quote}”</p></blockquote><figcaption>{review.author}{review.origin && `, ${review.origin}`}{review.source && <span className="review-source"> · {review.source}</span>}</figcaption></figure>)}</div>;
}
