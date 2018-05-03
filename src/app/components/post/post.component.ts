
import { Component, OnInit,  ViewChild } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CarouselComponent } from "angular2-carousel";
import {} from '@google/maps';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})


export class PostComponent implements OnInit {

  post:Post;
  zoom: number= 15;
  //Start position
  lat: number = -34.603418;
  lng: number = -58.381592;
  //Markers 
  markers: marker[] = [
    
  ];

  duration:string;
  distance:string;
  

  constructor(private activatedRoute: ActivatedRoute, 
              private _postsService: PostsService,
              private _router:Router) { 

      this.activatedRoute.params.subscribe( params => {
        //Se pone id porque es el nombre del parametro que esta en el routing ((/post/:id))!!!!!
          this.post=this._postsService.getPost(params['id']);

      })
  }

  ngOnInit(){
    this.lat= this.post.coordPickUp.lat;
    this.lng= this.post.coordPickUp.lng;
    let marker:marker={name:"Lugar de Retiro",lat: this.lat, lng: this.lng,draggable:false};
    this.markers.push(marker);
  }

  reservar(id:number){
    this._router.navigate(['/home']);
  }


  @ViewChild('topCarousel') topCarousel: CarouselComponent;

  toggle(){
    this.topCarousel.toggleMode();
  }

  cb=(status,response)=>{
    console.log(response);
//    console.log(response);
    if (response.status == 200) {
      this.distance=response.json.rows[0].elements[0].distance.text;
      this.duration=response.json.rows[0].elements[0].duration.text;  
    }
    console.log(this.distance);
    console.log(this.duration);
    
  }

  google= require('../../../../node_modules/@google/maps').createClient({
    key: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
  });

  mapClicked($event:any){
    let marker:marker={name:"Mi partida",lat:$event.coords.lat, lng:$event.coords.lng,draggable:false};
    this.markers.push(marker);
    
    var origin1 =[marker.lat,marker.lng];
    var destinationA = [this.post.coordPickUp.lat,this.post.coordPickUp.lng];
    
    this.google.distanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        mode: 'walking'
      }, this.cb);
  }

  markerClicked(m){
    var origin1 =[m.lat, m.lng];
    var destinationA = [this.post.coordPickUp.lat,this.post.coordPickUp.lng];
    
    this.google.distanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        mode: 'walking'
      }, this.cb);

  }
  // var newMarker = {
  //   name:'Untitled',
  //   lat: $event.coords.lat,
  //   lng: $event.coords.lng,
  //   draggable: false,
  // }

}

interface marker{
  name?:string;
  lat: number;
  lng: number;
  draggable: boolean;
}