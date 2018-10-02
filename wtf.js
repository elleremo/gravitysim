class More {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.count = 0;
    }

    render() {
        // Добавить метод рендера к самому объекту
        console.log("inside render");
        let a = sim;
        a(this);
        
        function sim(a) {
            let con = a;
            console.log("inside sim");
            console.log(a.ctx);
            sim(a);
        }
    }
}
    let canvas = $('#canvas')[0];
    let context = canvas.getContext('2d');

    let app = new More(canvas, context);

    app.render();
