public class BruteCollinearPoints {
    private int num = 0;
    private LineSegment[] allSegments;
    private LineSegment[] goodSegments;
    private LineSegment segment;

    public BruteCollinearPoints(Point[] points) {
        allSegments = new LineSegment[1];
        for (int i0 = 0; i0 < points.length; i0++) {
            if (points[i0] == null) throw new java.lang.NullPointerException();
            if (i0 > 0 && points[i0].compareTo(points[i0-1]) == 0) {
                throw new java.lang.IllegalArgumentException();
            }
            for (int i1 = 0; i1 < points.length; i1++) {
                if (i1 == i0) continue;
                if (points[i0].compareTo(points[i1]) >= 0) continue;

                for (int i2 = 0; i2 < points.length; i2++) {
                    if (i2 == i1 || i2 == i0) continue;
                    if (points[i1].compareTo(points[i2]) >= 0) continue;

                    double slope1 = points[i0].slopeTo(points[i1]);
                    double slope2 = points[i0].slopeTo(points[i2]);

                    if (slope1 == slope2) {
                        for (int i3 = 0; i3 < points.length; i3++) {
                            if (i3 == i2 || i3 == i1 || i3 == i0) continue;
                            if (points[i2].compareTo(points[i3]) >= 0) continue;

                            double slope3 = points[i0].slopeTo(points[i3]);

                            if (slope1 == slope3) {
                                if (num >= allSegments.length) {
                                    resize(allSegments.length*2);
                                }
                                segment = new LineSegment(points[i0], points[i3]);
                                allSegments[num++] = segment;
                            }
                        }
                    }
                }
            }
        }
    }
    public int numberOfSegments() {
        return num;
    }
    public LineSegment[] segments() {
        goodSegments = new LineSegment[num];
        for (int i = 0; i < num; i++) {
            goodSegments[i] = allSegments[i];
        }
        return goodSegments;
    }
    private void resize(int capacity) {
        assert capacity >= num;
        LineSegment[] temp = new LineSegment[capacity];
        for (int i = 0; i < num; i++) {
            temp[i] = allSegments[i];
        }
        allSegments = temp;
    }
}