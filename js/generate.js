AFRAME.registerComponent('generatefloor', {
    // for pool obj container
    schema: {
        pool: {
            type: 'string'
        },
        zoffset: {
            default: 0
        }
    },

    init: function () {
        this.start = false;

        this.el.sceneEl.addEventListener('start', ()=>{
            //generate floor
            this.gen();

            //set start
            this.start = true;
        });
    },

    tick: function (time, timeDelta) {
        

        //count on start
        if (this.start) {
            this.startTime = time;
            this.start = false;
        }

        //check if time passsss
        if (time - this.startTime > 3000) {
            //change position here
            //console.log('[tick] START!');
            
            let pos = this.el.getAttribute('position');
            pos.z += 2 * timeDelta / 1000;
            //pos.z += 0.01;

            if (pos.z >= 30) {
                pos.z = 0;
            }

        }
    },

    gen: function() {

        let planepool = this.el.sceneEl.components.pool__plane;
        // or
        // let planepool = this.el.sceneEl.components['pool__plane'];

        for(let i=0; i<100; i++){
            setTimeout(()=>{
                let el = planepool.requestEntity();
                el.setAttribute('position', '0 0 '+(i*-1));
                el.play();
            }, i*200);
        }
    }
});
