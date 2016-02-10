public class QuickUnion {
    static int[] id;
    static int[] size;

    public QuickUnion(int N){
        id = new int[N];
        size = new int[N];

        for(int i = 0; i < N; i++) {
            id[i] = i;
            size[i] = 1;
        }
    }

    private int root(int i){
        while (i != id[i])
            i = id[i];

        return i;
    }

    public boolean connected(int p, int q){
        return root(p) == root(q);
    }

    public void union(int p, int q){
        int pRoot = root(p);
        int qRoot = root(q);

        if (pRoot == qRoot)
            return;

        if (size[pRoot] < size[qRoot]) {
            id[pRoot] = qRoot;
            size[qRoot] += size[pRoot];
        } else {
            id[qRoot] = pRoot;
            size[pRoot] += size[qRoot];
        }
    }

    public static void main(String[] args){
        QuickUnion qu = new QuickUnion(10);

        qu.union(0, 9);
        qu.union(7, 2);
        qu.union(5, 0);
        qu.union(4, 6);
        qu.union(3, 1);
        qu.union(3, 2);
        qu.union(9, 6);
        qu.union(1, 6);
        qu.union(7, 8);

        for(int i=0; i < id.length; i++){
            System.out.print(id[i]);
            System.out.print(' ');
        }
        System.out.print('\n');
    }
}