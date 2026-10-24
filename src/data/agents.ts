import type { StaticImageData } from "next/image";

import agent1 from "@/assets/images/agent-1.jpg";
import agent2 from "@/assets/images/agent-2.jpg";
import agent3 from "@/assets/images/agent-3.jpg";
import agent4 from "@/assets/images/agent-4.jpg";
import agent5 from "@/assets/images/agent-5.jpg";
import agent6 from "@/assets/images/agent-6.jpg";

/** Sample partner-agent profiles — fictional people, stock portraits. */
export type Agent = {
  name: string;
  market: string;
  years: number;
  sales: number;
  rating: number;
  reviews: number;
  specialty: string;
  photo: StaticImageData;
};

export const agents: Agent[] = [
  { name: "Andre Collins", market: "Denver, CO", years: 14, sales: 38, rating: 4.9, reviews: 212, specialty: "Move-up homes", photo: agent1 },
  { name: "Tasha Greene", market: "Charlotte, NC", years: 11, sales: 31, rating: 5.0, reviews: 164, specialty: "First-time sellers", photo: agent2 },
  { name: "Nia Brooks", market: "Atlanta, GA", years: 9, sales: 27, rating: 4.9, reviews: 118, specialty: "Condos & townhomes", photo: agent3 },
  { name: "Mateo Ruiz", market: "Phoenix, AZ", years: 8, sales: 44, rating: 4.8, reviews: 236, specialty: "New construction", photo: agent4 },
  { name: "Grace Owusu", market: "Columbus, OH", years: 16, sales: 35, rating: 5.0, reviews: 190, specialty: "Relocation", photo: agent5 },
  { name: "Ryan Mercer", market: "Austin, TX", years: 12, sales: 52, rating: 4.9, reviews: 301, specialty: "Luxury & acreage", photo: agent6 },
];
