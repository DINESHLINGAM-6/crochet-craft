import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely beautiful! The quality is amazing and it arrived perfectly packaged. Will definitely order again!"
  },
  {
    id: "2",
    author: "Priya K.",
    rating: 5,
    date: "1 week ago",
    comment: "Gorgeous handcrafted work. The attention to detail is incredible. Perfect gift for my friend!"
  },
  {
    id: "3",
    author: "Meera R.",
    rating: 4,
    date: "2 weeks ago",
    comment: "Very nice product. The colors are vibrant and the quality is good. Took a bit longer to arrive but worth the wait."
  }
];

const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 75 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 }
];

export const ProductReviews = () => {
  const averageRating = 4.8;
  const totalReviews = 127;

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <Card className="glass-effect border-2">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">{averageRating}</div>
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {RATING_DISTRIBUTION.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-12">{item.stars} ⭐</span>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-xl font-poppins font-bold">Customer Reviews</h3>
        <div className="space-y-4">
          {SAMPLE_REVIEWS.map((review) => (
            <Card key={review.id} className="glass-effect border hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                      {review.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
