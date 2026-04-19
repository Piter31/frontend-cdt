"use client";

import { DollarSign, TrendingUp, AlertTriangle, BarChart2 } from "lucide-react";
import { getAdminMetrics } from "@/constants/data";

export function MetricsCards() {
  const metrics = getAdminMetrics();

  const cards = [
    {
      title: "Ventas Totales",
      value: `$${(metrics.totalSales / 1000).toFixed(0)}K`,
      subtext: "+18% vs. mes anterior",
      icon: DollarSign,
      color: "bg-[#c4883a]",
      bg: "bg-amber-50",
      textColor: "text-[#c4883a]",
      positive: true,
    },
    {
      title: "Vendidas Hoy",
      value: `$${(metrics.todaySales / 1000).toFixed(1)}K`,
      subtext: "12 pedidos este día",
      icon: TrendingUp,
      color: "bg-green-600",
      bg: "bg-green-50",
      textColor: "text-green-700",
      positive: true,
    },
    {
      title: "Stock Crítico",
      value: `${metrics.criticalStock}`,
      subtext: `producto${metrics.criticalStock !== 1 ? "s" : ""} bajo mínimo`,
      icon: AlertTriangle,
      color: metrics.criticalStock > 0 ? "bg-red-500" : "bg-green-600",
      bg: metrics.criticalStock > 0 ? "bg-red-50" : "bg-green-50",
      textColor: metrics.criticalStock > 0 ? "text-red-600" : "text-green-600",
      positive: metrics.criticalStock === 0,
    },
    {
      title: "Ganancia Estimada",
      value: `$${(metrics.estimatedProfit / 1000).toFixed(0)}K`,
      subtext: "Margen promedio 55%",
      icon: BarChart2,
      color: "bg-[#d4a0a7]",
      bg: "bg-[#f9f0f1]",
      textColor: "text-[#8b5e4a]",
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border border-[#e8d5c0] p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-[#8b5e4a] uppercase tracking-wider">
                {card.title}
              </p>
            </div>
            <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center`}>
              <card.icon className="w-4.5 h-4.5 text-white" />
            </div>
          </div>
          <p className="font-display text-3xl font-semibold text-[#2c1810] mb-1">
            {card.value}
          </p>
          <p className={`text-xs font-medium ${card.textColor}`}>
            {card.positive ? "↑ " : "⚠ "}
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}
