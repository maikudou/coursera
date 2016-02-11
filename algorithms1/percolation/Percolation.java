import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    private int size;
    private WeightedQuickUnionUF uf;
    private boolean[] sites;
    private int cIndex;
    private int openCount;

    public Percolation(int N){
        if(N <= 0){
            throw new java.lang.IllegalArgumentException();
        }
        size = N;
        openCount = 0;
        uf = new WeightedQuickUnionUF(N*N);
        sites = new boolean[N*N];
        for(int i=0; i < sites.length; i++){
            sites[i] = false;
        }
    }
    public void open(int i, int j){
        if(!isOpen(i, j)){
            openCount++;
            cIndex = (i-1)*size+j-1;
            sites[cIndex]=true;

            if(j>1){
                if(isOpen(i, j-1)){
                    uf.union(cIndex, cIndex-1);
                }
            }
            if(j<size){
                if(isOpen(i, j+1)){
                    uf.union(cIndex, cIndex+1);
                }
            }

            if(i>1){
                if(isOpen(i-1, j)){
                    uf.union(cIndex, (i-2)*size+j-1);
                }
            }
            if(i<size){
                if(isOpen(i+1, j)){
                    uf.union(cIndex, (i)*size+j-1);
                }
            }
        }
    }
    public boolean isOpen(int i, int j){
        return sites[(i-1)*size+j-1];
    }
    public boolean isFull(int i, int j){
        int column = 1;
        while(column <= size){
            if(isOpen(1, column) && uf.connected(column-1, (i-1)*size+j-1)){
                return true;
            }
            column++;
        }
        return false;
    }
    public boolean percolates(){
        int column = 1;
        while(column <= size){
            if(isFull(size, column)){
                return true;
            }
            column++;
        }
        return false;
    }
    public int count(){
        return openCount;
    }

    public static void main(String[] args) {

    }
}
