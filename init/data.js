const roomListings = [
    {
      title: "Cozy Studio Apartment",
      description: "Furnished studio with kitchen, WiFi, and city view",
      image: {
        url: "https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "listing[image]"
      },
      price: 1200,
      location: "New York, NY",
      country: "USA",
      geometry: {
        type: "Point",
        coordinates: [-73.935242, 40.730610]
      }
    },
    {
      title: "Spacious 2BHK Condo",
      description: "Modern 2-bedroom condo with balcony and gym access",
      image: {
        url: "https://crovillas-galleries.storage.googleapis.com/img/properties/4bedb017-5e36-4fde-8ab5-c1a1c8b277d3/borealis_b54cfa65_md.jpeg",
        filename: "listing[image]"
      },
      price: 2500,
      location: "Los Angeles, CA",
      country: "USA",
      geometry: {
        type: "Point",
        coordinates: [-118.243683, 34.052235]
      }
    },
    {
      title: "Luxury Penthouse Suite",
      description: "5-star penthouse with rooftop terrace and city skyline view",
      image: {
        url: "https://crovillas-galleries.storage.googleapis.com/img/properties/4bedb017-5e36-4fde-8ab5-c1a1c8b277d3/borealis_4c414ec8_hd.jpeg",
        filename: "listing[image]"
      },
      price: 7500,
      location: "London",
      country: "UK",
      geometry: {
        type: "Point",
        coordinates: [-0.118092, 51.509865]
      }
    },
    {
      title: "Beachfront Villa",
      description: "Private villa with pool and direct beach access",
      image: {
        url: "https://mannavilla.com/images/banner-1.jpg",
        filename: "listing[image]"
      },
      price: 5000,
      location: "Malibu, CA",
      country: "USA",
      geometry: {
        type: "Point",
        coordinates: [-118.788193, 34.031246]
      }
    },
    {
      title: "Minimalist Loft Apartment",
      description: "Open-plan loft with high ceilings and modern decor",
      image: {
        url: "https://www.rewariproperties.com/public/uploads/newsphotos/advantages-of-living-in-a-villa.jpg",
        filename: "listing[image]"
      },
      price: 1800,
      location: "Berlin",
      country: "Germany",
      geometry: {
        type: "Point",
        coordinates: [13.404954, 52.520008]
      }
    },
    {
      title: "Classic Parisian Apartment",
      description: "Elegant 1-bedroom with vintage charm and balcony",
      image: {
        url: "https://panel.mavillam.com/images/7/aura-villas-mavillam-kiralik-tatil%20(10)n0HRzJeEKh1Y.jpeg",
        filename: "listing[image]"
      },
      price: 3200,
      location: "Paris",
      country: "France",
      geometry: {
        type: "Point",
        coordinates: [2.352222, 48.856614]
      }
    },
    {
      title: "Modern Smart Home",
      description: "Fully automated home with voice control and smart lighting",
      image: {
        url: "https://www.kiralikvilladatatil.com/uploads/01osmn_365.jpg",
        filename: "listing[image]"
      },
      price: 4000,
      location: "Dubai",
      country: "UAE",
      geometry: {
        type: "Point",
        coordinates: [55.296249, 25.276987]
      }
    },
    {
      title: "Countryside Cottage",
      description: "Peaceful retreat with fireplace and garden",
      image: {
        url: "https://panel.villaevreni.com/images/0/V%C4%B0LLA%20SARE%20_76nstFVpInPGzG.jpeg",
        filename: "listing[image]"
      },
      price: 900,
      location: "Sydney",
      country: "Australia",
      geometry: {
        type: "Point",
        coordinates: [151.209900, -33.865143]
      }
    },
    {
      title: "Traditional Japanese Ryokan",
      description: "Authentic ryokan with tatami mats and hot springs",
      image: {
        url: "https://panel.villaevreni.com/images/0/resp/V%C4%B0LLA%20SARE%20_411n2I0sQ3BbcP.jpeg",
        filename: "listing[image]"
      },
      price: 2800,
      location: "Kyoto",
      country: "Japan",
      geometry: {
        type: "Point",
        coordinates: [135.768326, 35.011665]
      }
    },
    {
      title: "Luxury High-Rise Apartment",
      description: "Skyline views, rooftop pool, and concierge service",
      image: {
        url: "https://panel.villaevreni.com/images/0/resp/V%C4%B0LLA%20SARE%20_22w3TrfxkrMwUl.jpeg",
        filename: "listing[image]"
      },
      price: 4600,
      location: "San Francisco, CA",
      country: "USA",
      geometry: {
        type: "Point",
        coordinates: [-122.431297, 37.773972]
      }
    }
  ];
  
  module.exports = { data: roomListings };
  