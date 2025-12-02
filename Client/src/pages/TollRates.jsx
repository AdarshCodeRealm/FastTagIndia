import { Car, MapPin, Calculator, Info, Route, Clock, Banknote, Navigation } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useState } from "react";

const TollRates = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("Car/Jeep/Van");
  
  const vehicleTypes = [
    { id: "Car/Jeep/Van", name: "Car/Jeep/Van", category: "VC-4" },
    { id: "LCV", name: "Light Commercial Vehicle", category: "VC-5" },
    { id: "Bus/Truck", name: "Bus/Truck (2 Axle)", category: "VC-6" },
    { id: "HeavyVehicle", name: "Heavy Vehicle (3+ Axle)", category: "VC-7" },
  ];

  const majorTollPlazas = [
    {
      name: "Mumbai-Pune Expressway",
      location: "Maharashtra",
      distance: "94.5 km",
      rates: {
        "Car/Jeep/Van": "₹315",
        "LCV": "₹505",
        "Bus/Truck": "₹1035",
        "HeavyVehicle": "₹1560"
      },
      operator: "MSRDC",
      type: "Expressway"
    },
    {
      name: "Delhi-Gurgaon Toll Plaza",
      location: "Haryana",
      distance: "8 km",
      rates: {
        "Car/Jeep/Van": "₹48",
        "LCV": "₹76",
        "Bus/Truck": "₹160",
        "HeavyVehicle": "₹240"
      },
      operator: "NHAI",
      type: "Highway"
    },
    {
      name: "Chennai-Bangalore Highway",
      location: "Tamil Nadu",
      distance: "15 km",
      rates: {
        "Car/Jeep/Van": "₹65",
        "LCV": "₹105",
        "Bus/Truck": "₹215",
        "HeavyVehicle": "₹325"
      },
      operator: "NHAI",
      type: "National Highway"
    },
    {
      name: "Yamuna Expressway",
      location: "Uttar Pradesh",
      distance: "165 km",
      rates: {
        "Car/Jeep/Van": "₹375",
        "LCV": "₹615",
        "Bus/Truck": "₹1250",
        "HeavyVehicle": "₹1875"
      },
      operator: "YEIDA",
      type: "Expressway"
    },
    {
      name: "Ahmedabad-Vadodara Expressway",
      location: "Gujarat",
      distance: "93 km",
      rates: {
        "Car/Jeep/Van": "₹285",
        "LCV": "₹455",
        "Bus/Truck": "₹945",
        "HeavyVehicle": "₹1420"
      },
      operator: "NHAI",
      type: "Expressway"
    },
    {
      name: "Kolkata-Asansol Highway",
      location: "West Bengal",
      distance: "12 km",
      rates: {
        "Car/Jeep/Van": "₹55",
        "LCV": "₹85",
        "Bus/Truck": "₹175",
        "HeavyVehicle": "₹265"
      },
      operator: "NHAI",
      type: "National Highway"
    }
  ];

  const filteredRates = majorTollPlazas.map(plaza => ({
    ...plaza,
    currentRate: plaza.rates[selectedVehicleType]
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 backdrop-blur-sm border border-primary/20">
              <Calculator className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">Toll Rates</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Find current toll rates across major highways and expressways in India
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Updated as of: {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Vehicle Type Selector */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Car className="h-6 w-6 text-primary" />
              Select Vehicle Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedVehicleType(type.id)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    selectedVehicleType === type.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{type.name}</div>
                  <div className="text-xs text-muted-foreground">Category: {type.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Toll Rates Table */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Route className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Major Toll Plazas</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Route</th>
                    <th className="text-left p-4 font-semibold text-foreground">Location</th>
                    <th className="text-left p-4 font-semibold text-foreground">Distance</th>
                    <th className="text-left p-4 font-semibold text-foreground">Rate ({selectedVehicleType})</th>
                    <th className="text-left p-4 font-semibold text-foreground">Operator</th>
                    <th className="text-left p-4 font-semibold text-foreground">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRates.map((plaza, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-foreground">{plaza.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {plaza.location}
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{plaza.distance}</td>
                      <td className="p-4">
                        <span className="text-lg font-bold text-primary">{plaza.currentRate}</span>
                      </td>
                      <td className="p-4 text-muted-foreground">{plaza.operator}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {plaza.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* FASTag Benefits */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Banknote className="h-5 w-5 text-green-600" />
                FASTag Benefits
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span>No queues at toll plazas - drive through without stopping</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Automatic deduction from prepaid wallet</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span>SMS alerts for every transaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Valid across all toll plazas in India</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <span>Easy online recharge and balance check</span>
                </li>
              </ul>
            </div>

            {/* Important Information */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Info className="h-5 w-5 text-blue-600" />
                Important Information
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <span>Toll rates are subject to periodic revisions by authorities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <span>FASTag is mandatory for all four-wheelers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <span>Double toll charged for vehicles without FASTag</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <span>Return journey discount available on selected routes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <span>Ensure sufficient balance before travel</span>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Need a FASTag?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get your FASTag today and enjoy seamless toll payments across India. 
              Quick activation, instant recharge, and 24/7 customer support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/buy-fastag" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Car className="h-5 w-5 mr-2" />
                Buy FASTag
              </a>
              <a 
                href="/recharge-fastag" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <Banknote className="h-5 w-5 mr-2" />
                Recharge FASTag
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TollRates;