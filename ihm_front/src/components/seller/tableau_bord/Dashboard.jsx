import React from "react"; 
import { Card, CardContent } from "@mui/material";
 import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const salesData = [ 
    { day: "Lun", ventes: 120 },
     { day: "Mar", ventes: 210 },
      { day: "Mer", ventes: 150 }, 
      { day: "Jeu", ventes: 180 }, 
      { day: "Ven", ventes: 230 },
       { day: "Sam", ventes: 90 }, 
       { day: "Dim", ventes: 75 }, ];

const pieData = [
     { name: "Produit A", value: 400 }, 
     { name: "Produit B", value: 300 }, 
     { name: "Produit C", value: 300 }, { name: "Produit D", value: 200 }, ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SellerDashboard() { 
    return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"> 
    <Card> 
        <CardContent className="p-4">
             <h2 className="text-xl font-semibold mb-2">Ventes cette semaine</h2> 
             <ResponsiveContainer width="100%" height={200}> 
                <BarChart data={salesData}>
                     <XAxis dataKey="day" /> 
                     <YAxis /> 
                     <Tooltip /> 
                     <Bar dataKey="ventes" fill="#4f46e5" /> 
                     </BarChart> 
                     </ResponsiveContainer> 
        </CardContent>
    </Card>

<Card>
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2">Répartition des ventes par produit</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  <Card className="md:col-span-2">
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-4">Commandes récentes</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th className="py-2">Client</th>
            <th>Produit</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Alice</td>
            <td>Produit A</td>
            <td>05/05/2025</td>
            <td>Expédié</td>
          </tr>
          <tr>
            <td className="py-2">Bob</td>
            <td>Produit C</td>
            <td>05/05/2025</td>
            <td>En cours</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</div>

); }