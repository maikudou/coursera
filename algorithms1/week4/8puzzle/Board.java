import edu.princeton.cs.algs4.Stack;

public class Board {
    private int[][] blocks;
    private int N;
    private int manDist;
    private int hamDist;

    public Board(int[][] inputBlocks) {
        N = inputBlocks[0].length;
        manDist = -1;
        hamDist = -1;

        blocks = new int[N][N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                blocks[i][j] = inputBlocks[i][j];
            }
        }
    }

    private int[][] cloneBlocks() {
        int[][] cloneBlocks = new int[N][N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                cloneBlocks[i][j] = blocks[i][j];
            }
        }

        return cloneBlocks;
    }

    public int dimension() {
        return N;
    }

    public int hamming() {
        if (hamDist > -1) {
            return hamDist;
        }
        int ham = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (i == N-1 && j == N-1 && blocks[i][j] != 0) {
                    ham++;
                } else if (blocks[i][j] != i*N+j+1) {
                    ham++;
                }
            }
        }
        ham--;
        hamDist = ham;
        return ham;
    }

    public int manhattan() {
        if (manDist > -1) {
            return manDist;
        }
        int distance = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                int targetI;
                int targetJ;
                if (blocks[i][j] == 0) {
                    continue;
                } else {
                    targetI = (blocks[i][j]-1)/N;
                    targetJ = blocks[i][j] - targetI*N - 1;
                }
                distance += Math.abs(targetI-i) + Math.abs(targetJ-j);
            }
        }
        manDist = distance;
        return distance;
    }

    public boolean isGoal() {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (i == N-1 && j == N-1) {
                    return blocks[i][j] == 0;
                }

                if (blocks[i][j] != i*N+j+1) {
                    return false;
                }
            }
        }
        return true;
    }

    public Board twin() {
        int[][] twinBlocks = cloneBlocks();

        int i = 0;
        int j = 0;
        while (twinBlocks[i][j] == 0) {
            j++;
        }
        if (j < N-1 && twinBlocks[i][j+1] != 0) {
            int copy = twinBlocks[i][j+1];
            twinBlocks[i][j+1] = twinBlocks[i][j];
            twinBlocks[i][j] = copy;
        } else {
            int copy = twinBlocks[i+1][j];
            twinBlocks[i+1][j] = twinBlocks[i][j];
            twinBlocks[i][j] = copy;
        }
        return new Board(twinBlocks);
    }

    public boolean equals(Object y) {
        if (y == null) {
            return false;
        }
        if (y.getClass() != this.getClass()) {
            return false;
        }
        Board properY = (Board) y;
        if (properY == this) {
            return true;
        }
        if (properY.dimension() != dimension()) {
            return false;
        }
        return properY.toString().equals(toString());
    }

    public Iterable<Board> neighbors() {
        Stack<Board> neighbors = new Stack<Board>();

        search:
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) {
                    if (blocks[i][j] == 0) {
                        boolean left    = true;
                        boolean right   = true;
                        boolean up      = true;
                        boolean down    = true;
                        if (i == 0)     up    = false;
                        if (j == 0)     left  = false;
                        if (i == N-1)   down  = false;
                        if (j == N-1)   right = false;

                        if (up) {
                            int[][] neigborBlocks = cloneBlocks();
                            neigborBlocks[i][j] = neigborBlocks[i-1][j];
                            neigborBlocks[i-1][j] = 0;
                            neighbors.push(new Board(neigborBlocks));
                        }
                        if (down) {
                            int[][] neigborBlocks = cloneBlocks();
                            neigborBlocks[i][j] = neigborBlocks[i+1][j];
                            neigborBlocks[i+1][j] = 0;
                            neighbors.push(new Board(neigborBlocks));
                        }
                        if (left) {
                            int[][] neigborBlocks = cloneBlocks();
                            neigborBlocks[i][j] = neigborBlocks[i][j-1];
                            neigborBlocks[i][j-1] = 0;
                            neighbors.push(new Board(neigborBlocks));
                        }
                        if (right) {
                            int[][] neigborBlocks = cloneBlocks();
                            neigborBlocks[i][j] = neigborBlocks[i][j+1];
                            neigborBlocks[i][j+1] = 0;
                            neighbors.push(new Board(neigborBlocks));
                        }

                        break search;
                    }
                }
            }
        return neighbors;
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        s.append(N + "\n");
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                s.append(String.format("%2d ", blocks[i][j]));
            }
            s.append("\n");
        }
        return s.toString();
    }

    public static void main(String[] args) {

    }
}