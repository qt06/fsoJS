var fso = {
    a: new ActiveXObject("Scripting.FileSystemObject"),
    n: '',
    t: '',
	p: {},
    x: {
        f: 	null,
        o: 	0,
        read: function () {
			if ( this.o ) {
				return fso.a.GetFile(fso.n).size ? this.f.ReadAll() : '';
			}
			else {
				this.o = 1;
				return fso.open(0,{mode:1}).read();
			}
        },
        write: function (q,d) {
			if ( this.o ) {
				this.f.Write(q);
				this.o = 0;
				return this;
			}
			else {
				this.o = 1;
				return fso.open(0,{mode:d||2}).write(q);
			}
		},
        append: function (q) {
			return this.write(q,8);
        },
        prepend: function (q) {
			fso.t = this.read();
			return fso.open(0,{mode:2}).write(q+fso.t);
        }
    },
    open: function (z,b) {
		fso.n = fso.n || z;
		if ( !fso.a.FileExists(fso.n) ) fso.a.CreateTextFile(fso.n,false);
		if ( fso.x.o ) {
			b = b || {};
			b = {
				mode: b.mode || 1,
				create: b.create || 1,
				format: b.format || 0
			};
			fso.p = b;
			if ( !!fso.x.f ) { fso.x.f.Close(); fso.x.f = null; }
			fso.x.f = fso.a.OpenTextFile(fso.n, fso.p.mode, fso.p.create, fso.p.format);
		}
		return fso.x;
    }
};
