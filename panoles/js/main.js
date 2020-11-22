
window.addEventListener("load", event => main());

//window.addEventListener("click", event => createLink());
//window.addEventListener("click", event => createLink_back());
//window.addEventListener("click", event => create_hotspots1());
//window.addEventListener("click", event => create_hotspots2());

//window.addEventListener("load", event => create_Image());
// Création de nos différents diaporama

var sunset = "../assets/gaming.jpg";
const panorama = new PANOLENS.ImagePanorama(sunset);
var tunnel = "../assets/pano1.jpg"
const panorama2 = new PANOLENS.ImagePanorama(tunnel);

var video = "../assets/clip.mp4";
const video1 = new PANOLENS.VideoPanorama(video, {autoplay: true});

var videos = "../assets/clip1.mp4";
const video2 = new PANOLENS.VideoPanorama(videos, {autoplay: true})

var viewer = new PANOLENS.Viewer();



// Création de nos premiers infospot && bascule entre nos 2 panoramas

const createLink = (x,y,length) => {
   const input = new PANOLENS.Infospot(250, "../assets/arrow-up.png");
   input.position.set(x,y,length);
   input.addHoverText("Enive de prendre l'air ?")
   input.addEventListener('click', function(){
       input.addHoverText("");
       viewer.setPanorama(panorama2);
      // console.log("Panorama setup")
   });
   return input;
}

const createLink_back = (x,y,length) => {
   const output = new PANOLENS.Infospot(250, "../assets/arrow-bottom.png");
   output.position.set(x,y,length);
   output.addHoverText("Il est temps de travailler")
   output.addEventListener('click', function(){
       output.addHoverText("");
       viewer.setPanorama(panorama);
       console.log("Panorama plages")
   });
   return output;
}

// Vidéos pour les panoramaes 

const create_video_pan1 = (x,y,length) => {
    const v = new PANOLENS.Infospot(250, "../assets/arrow-bottom.png");
    v.position.set(x,y,length);
    v.addEventListener('click', function(){
       viewer.setPanorama(video1);
    });
    
    return v;
}

const create_back_pan1 = (x,y,length) => {
    const video_back = new PANOLENS.Infospot(250, "../assets/arrow-bottom.png");
    video_back.position.set(x,y,length);
    video_back.addEventListener('click', function() {
        viewer.setPanorama(panorama);

    });
    return video_back;
}

const create_video_pan2 = (x,y,length) => {
    const v2 = new PANOLENS.Infospot(250, "../assets/arrow-up.png");
    v2.position.set(x,y,length);
    v2.addHoverText(" Une petite video ?")
    v2.addEventListener('click', function(){
        v2.addHoverText('');
        viewer.setPanorama(video2);
    });
    return v2;
}

const create_back_pan2 = (x,y,length) => {
    const vb = new PANOLENS.Infospot(250, "../assets/arrow-bottom.png");
    vb.position.set(x,y,length);
    vb.addHoverText("Il est de temps de revenir")
    vb.addEventListener("click", function() {
        vb.addHoverText("");
        viewer.setPanorama(panorama2)
    });
    return vb;
}

// Création des hotspot pour les panoramas

const create_hotspots1 = (x,y,length) => {
    var index = 1;
    const h1 = new PANOLENS.Infospot(250, PANOLENS.DataImage.Info);
    h1.position.set(x,y,length);
    h1.addHoverText("Hotspot 1 ");
    h1.addEventListener('click', function(){
        index ++;
        h1.focus()
        h1.addHoverText('Magnifique écran 4k');
        if(index % 2) 
            h1.addHoverText('Hotspot 1 ' );
      //  console.log(index);
    });
    return h1;
}

const create_hotspots2 = (x,y,length) => {
    var index = 1;
    const h2 = new PANOLENS.Infospot(150, PANOLENS.DataImage.Info);
    h2.position.set(x,y,length);
    h2.addHoverText("Hotspot 1 ");
    h2.addEventListener('click', function(){
        index ++;
        h2.focus()
        h2.addHoverText('Vu dans les nuages');
        if (index % 2)
            h2.addHoverText('Hotspot 1 ' );      
      //  console.log(index);
    });
    
    return h2;
}

const create_hotspots3 = (x,y,length) => {
    var index = 1;
    const h3 = new PANOLENS.Infospot(150, PANOLENS.DataImage.Info);
    h3.position.set(x,y,length);
    h3.addHoverText("Hotspot 2 ");
    h3.addEventListener('click', function(){
        h3.focus()
        index ++;
        h3.addHoverText('Magnifique carte graphique');
        if(index % 2)
            h3.addHoverText('Hotspot 2');
    });
    return h3;
}

const create_hotspots4 = (x,y,length) => {
    var index = 1;
    const h4 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    h4.position.set(x,y,length);
    h4.addHoverText("Hotspot 2 ");
    h4.addEventListener('click', function(){
        index ++;
        h4.focus()
        h4.addHoverText('Regarde il prépare son bateau !');
        if(index % 2)
            h4.addHoverText('Hotspot 2');
    });
    return h4;
}


/*const create_Image = (x,y,length,ix,iy,i_length) => {

    const text = new THREE.TextureLoader("../asssets/claviet.jpg");
    const infospot3 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot3.position.set(x,y,length);
    infospot3.addEventListener('click', function(){
        Image1.position.set(ix,iy,i_length);
        console.log("Premiere image");
    });
    return Image1;
}*/

const main = () => {
    
    //Appels entrée/sortie 
    var input= createLink(2100,1350,-5000);
    var output= createLink_back(0,400,-5000);


    // Appels de nos différents hotspot    
    var h1 = create_hotspots1(4000,900,-5000)
    var h2 = create_hotspots2(2700,1800,-5000)
    var h3 = create_hotspots3 (175,-560,-5000);
    var h4 = create_hotspots4 (9000,-1000,-5000);


    // Lien pour navgiguer entre panoramas et videos
    var v1 = create_video_pan1(2120,-1300,-5000);
    var vb1 = create_back_pan1(1000, 600,-5000);

    var v2 = create_video_pan2(2120, -1300, -5000);
    var vb2 = create_back_pan2(0,0,-5000);
    
    
    //var i1 = create_Image(0,400,-5000,12,12,12 )
    
    // Ajout de nos panoramas && infospots et de nos videos

    panorama.add(input,h1,h3,v1);
    panorama2.add(output,h2,h4,v2);
    video1.add(vb1);
    video2.add(vb2);
    viewer.add(panorama, panorama2,video1,video2);
    viewer.addUpdateCallback(function(){

    });

    //  
    console.log("Premier diapo ")

    };
 
