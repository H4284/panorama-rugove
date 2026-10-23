// Guest reviews per room, in the same order as the rooms in content.ts:
// 0 double, 1 triple, 2 quadruple, 3 apartment, 4 villa.
//
// ONLY REAL REVIEWS. Never write or "improve" a review: copy it word for word from a real guest,
// with the guest's permission (or from a platform whose terms allow it), and fill in `source`.
// Invented reviews are illegal for businesses under EU consumer law. A room with an empty list
// shows no review block at all.
export type Review = {
  quote: string; // the guest's own words, unedited, in the language they wrote it
  author: string; // as the guest agreed to be named, e.g. "Arta K."
  origin?: string; // e.g. "Prishtinë" or "Germany"
  rating?: 1 | 2 | 3 | 4 | 5;
  source?: string; // e.g. "Google", "Booking.com", "direct"
};

export const roomReviews: Review[][] = [[], [], [], [], []];
