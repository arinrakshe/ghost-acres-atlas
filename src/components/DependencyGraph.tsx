import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FoodDependency, regions } from '@/data/cities';
import { foodCategoryColors } from '@/lib/globe-utils';

interface DependencyGraphProps {
    cityId: string;
    dependencies: FoodDependency[];
}

export default function DependencyGraph({ cityId, dependencies }: DependencyGraphProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !dependencies.length) return;

        const width = 300;
        const height = 200;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Data preparation
        const nodes = [
            { id: cityId, group: 'city', radius: 15 },
            ...dependencies.map(d => ({
                id: d.regionId,
                group: 'region',
                category: d.foodCategory,
                radius: 8 + (d.percentOfCitySupply / 5) // Size based on importance
            }))
        ];

        const links = dependencies.map(d => ({
            source: d.regionId,
            target: cityId,
            value: d.percentOfCitySupply,
            color: foodCategoryColors[d.foodCategory]
        }));

        // Simulation
        const simulation = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Draw lines
        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", d => d.color || "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", d => Math.sqrt(d.value));

        // Draw nodes
        const node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => d.group === 'city' ? "#fff" : (foodCategoryColors[(d as any).category] || "#ccc"))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5);

        // Add tooltips/labels (simplified for now)
        node.append("title")
            .text(d => d.id === cityId ? "City" : d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });

    }, [cityId, dependencies]);

    return (
        <div className="border border-border rounded-lg bg-black/20 p-2">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Supply Network</h3>
            <svg ref={svgRef} width="100%" height="200" viewBox="0 0 300 200" className="overflow-visible" />
        </div>
    );
}
