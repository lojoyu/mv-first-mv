AFRAME.registerComponent('analysereffect', {
    schema: {
        analyser: { type: 'selector' },
    },
    
    init: function () {
        let firstcam = document.getElementById('firstcam');
        let secondcam = document.getElementById('secondcam');

        this.data.analyser.addEventListener('audioanalyser-beat-high',() => {
            //TODO: add event listener
            console.log('high beat!!');

            //Math.random()
            let rotx = Math.random() * (-90);
            let roty = Math.random() * 90 - 45;
            //secondcam.setAttribute('rotation', '0 0 0');
            secondcam.setAttribute('rotation', {
                x: rotx,
                y: roty,
                z: 0
            });

            //secondcam.setAttribute('camera', 'active: true');
            secondcam.setAttribute('camera', 'active', true);
            firstcam.setAttribute('camera', 'active', false);

            setTimeout(()=>{
                firstcam.setAttribute('camera', 'active', true);
                secondcam.setAttribute('camera', 'active', false);
            }, 300);

            //advance - color
            let r = 200;
            let color = `rgb(${r}, 200,0)`;
            this.el.setAttribute('color', color);
        });
    },

    tick: function (time, timeDelta) {
        let analyser = this.data.analyser;
        let analysercomp = analyser.components.audioanalyser;
        //console.log(analysercomp);

        if (analysercomp) {
            let volume = analysercomp.volume / 100;
            //console.log(volume);
            this.el.setAttribute('intensity', volume);
        }
    }
});
