import { Component, AfterViewInit, Input } from "@angular/core";

import { googleMapsApiConfig } from "../../../../google-maps.config";

@Component({
  selector: "google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.scss"]
})
export class GoogleMapsComponent implements AfterViewInit {
  @Input() coordinates: { latitude: number; longitude: number };

  constructor() {}

  async ngAfterViewInit() {
    const googleMaps = await getGoogleMaps(googleMapsApiConfig.apiKey);
    this.initMap();
  }

  initMap() {
    console.log(this.coordinates.latitude);
    console.log(this.coordinates.longitude);
    const POSITION = {
      lat: this.coordinates.latitude,
      lng: this.coordinates.longitude
    };

    // TODO fix this - causes error - doesnt recognize "Google"
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   zoom: 16,
    //   center: POSITION || { lat: 22, lng: 22 }
    // });
    // const marker = new google.maps.Marker({
    //   position: POSITION,
    //   map: map
    // });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject("google maps not available");
      }
    };
  });
}
