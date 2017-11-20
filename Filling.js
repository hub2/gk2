function Node(x, maxY, dx, next){
    this.x = x;
    this.maxY = maxY;
    this.dx = dx;
    this.next = next;
}

Node.prototype.removeWithMaxY = function(y){
    var newHead = null, newTail = null;
    var current = this;
    var copy;
    while(current !== null){
        if(current.maxY > y){
            if(newHead === null){
                newHead = current;
                newTail = current;
                current = current.next;
                newHead.next = null;
                newTail.next = null;
            }
            else{
                copy = current;
                current = current.next;
                copy.next = newHead;
                newHead = copy;
            }
        }
        else{
            current = current.next;
        }
    }
    return [newHead, newTail];
};

var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }

    var prev = null;
    var slow = head;
    var fast = head;
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }

    // close first half list
    prev.next = null;

    const l1 = sortList(head);
    const l2 = sortList(slow);
    return merge(l1, l2);
};

function merge(l1, l2) {
    const head = new Node();
    var current = head;

    while (l1 !== null && l2 !== null) {
        if (l1.x < l2.x) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }

        current = current.next;
    }

    current.next = (l1 === null) ? l2 : l1;

    return head.next;
}

function Filling(drawer, edges){
    this.drawer = drawer;
    this.edges = edges;
    this.AEThead = null;
    this.AETtail = null;

    this.maxY = -1;
    this.minY = Number.POSITIVE_INFINITY;
    var that = this;

    this.edges.forEach(function(edge){
        that.maxY = Math.max(edge.v1.y, that.maxY);
        that.maxY = Math.max(edge.v2.y, that.maxY);

        that.minY = Math.min(edge.v1.y, that.minY);
        that.minY = Math.min(edge.v2.y, that.minY);
    });
    this.buckets = new Array(this.maxY + 1);


    // Create buckets of head, tail pairs
    for(var i = 0; i < this.maxY + 1; i++)
        this.buckets[i] = [null, null];

    edges.forEach(function(edge){
        var maxY = Math.max(edge.v1.y, edge.v2.y);
        var minY = Math.min(edge.v1.y, edge.v2.y);
        var x = edge.v1.y == maxY ? edge.v2.x : edge.v1.x;
        var dx = edge.v1.y == edge.v2.y ? NaN : ((edge.v2.x - edge.v1.x) / (edge.v2.y - edge.v1.y));
        if(that.buckets[minY] == null) debugger;
        var next = that.buckets[minY][0]; // we are adding at the head position, so old head is our next
        var nextNode = new Node(x, maxY, dx, next);

        if(that.buckets[minY][1] === null)  // tail is the first item added, then it stays the same
        {
            that.buckets[minY][1] = nextNode;
            that.buckets[minY][1].next = null;
        }

        // add new node as new head
        that.buckets[minY][0] = nextNode;
    });
}

Filling.prototype.fill = function(){
    var y = this.minY;
    while(y < this.buckets.length - 1)
    {
        if (this.buckets[y][0] !== null){
            if(this.AEThead === null){
                this.AEThead = this.buckets[y][0];
                this.AETtail = this.buckets[y][1];
            }
            else{
                this.AETtail.next = this.buckets[y][0];
                this.AETtail = this.buckets[y][1];
            }
        }
        this.AETtail.next = null;
        this.AEThead = sortList(this.AEThead);

        var current = this.AEThead;
        var drawing = true;
        while(current !== null && current.next !== null)
        {
            if(isNaN(current.dx))
            {
                current = current.next;
                continue;
            }
            if(drawing){
                var x0 = current.x;
                var x1 = current.next.x;

                for(var x = x0; x<= x1; x++)
                    this.drawer.setPixel(x, y);

            }

            current = current.next;
            drawing = !drawing;
        }
        y++;
        var _ = this.AEThead.removeWithMaxY(y);
        this.AEThead = _[0];
        this.AETtail = _[1];

        current = this.AEThead;
        while(current !== null){
            current.x += current.dx;
            current = current.next;
        }

    }
};

function printList(head){
    var current = head;
    var _ = 0;
    while(current !== null){
        console.log(current);
        current = current.next;
    }

}