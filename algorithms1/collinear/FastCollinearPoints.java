import java.util.Arrays;

public class FastCollinearPoints {
    private int num = 0;
    private int sortedNum = 0;
    private LineSegment[] allSegments;
    private LineSegment[] goodSegments;
    private LineSegment segment;
    private Point[] sortedPoints;

    public FastCollinearPoints(Point[] points) {
        allSegments = new LineSegment[1];
        num = 0;
        for (int i0 = 0; i0 < points.length; i0++) {
            sortedPoints = new Point[points.length-1];
            sortedNum = 0;
            if (points[i0] == null) throw new java.lang.NullPointerException();
            if (i0 > 0 && points[i0].compareTo(points[i0-1]) == 0) {
                throw new java.lang.IllegalArgumentException();
            }
            for (int i1 = 0; i1 < points.length; i1++) {
                if (i1 == i0) continue;
                if (points[i0].compareTo(points[i1]) == 0) {
                    throw new java.lang.IllegalArgumentException();
                }
                sortedPoints[sortedNum++] = points[i1];
            }
            Arrays.sort(sortedPoints, points[i0].slopeOrder());
            int kStart = 0;
            int streakLen = 0;
            for (int k = 1; k < sortedPoints.length; k++) {
                double currentSlope = points[i0].slopeTo(sortedPoints[k]);
                double prevSlope = points[i0].slopeTo(sortedPoints[k-1]);
                if (currentSlope == prevSlope) {
                    streakLen++;
                    if (streakLen == 1) {
                        kStart = k-1;
                    }
                    if (k == sortedPoints.length-1 && streakLen >= 2) {
                        sSeg(kStart, streakLen, sortedPoints, points[i0]);
                    }
                } else if (streakLen >= 2) {
                    sSeg(kStart, streakLen, sortedPoints, points[i0]);
                    streakLen = 0;
                } else {
                    streakLen = 0;
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
    private void sSeg(int kStart, int streakLen, Point[] sp, Point start) {
        Point[] eqPoints = new Point[streakLen+1];
        for (int m = kStart; m <= kStart+streakLen; m++) {
            eqPoints[m-kStart] = sp[m];
        }

        Arrays.sort(eqPoints);
        if (start.compareTo(eqPoints[0]) == -1) {
            if (num >= allSegments.length) {
                resize(allSegments.length*2);
            }
            segment = new LineSegment(start, eqPoints[streakLen]);
            allSegments[num++] = segment;
        }
    }
}