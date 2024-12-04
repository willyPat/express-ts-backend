
// Here we would normally have a shcema definition by some ORM. Since im not using any DB Ill just create an interface
export interface Interaction {
  id: string; 
  pastorId: string;
  timestamp: string; 
  state: string; 
  coordinates: [number, number]; // Lat/Lon coordinates for the state center
}
