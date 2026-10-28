import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Skills3DCloudProps {
  selectedCategory: string;
  activeSkill: string | null;
  onSelectSkill: (skill: string) => void;
}

const ALL_SKILLS = [
  { name: "Python", cat: "Languages & Core", color: "#38bdf8" },
  { name: "Java", cat: "Languages & Core", color: "#f97316" },
  { name: "JavaScript", cat: "Languages & Core", color: "#facc15" },
  { name: "SQL", cat: "Languages & Core", color: "#06b6d4" },
  { name: "HTML5", cat: "Languages & Core", color: "#fb923c" },
  { name: "CSS", cat: "Languages & Core", color: "#60a5fa" },
  { name: "Spring Boot", cat: "Frameworks & Libraries", color: "#4ade80" },
  { name: "Flask", cat: "Frameworks & Libraries", color: "#94a3b8" },
  { name: "React.js", cat: "Frameworks & Libraries", color: "#38bdf8" },
  { name: "Bootstrap", cat: "Frameworks & Libraries", color: "#a855f7" },
  { name: "AWS EC2/S3/RDS", cat: "Cloud & Databases", color: "#f59e0b" },
  { name: "MySQL", cat: "Cloud & Databases", color: "#3b82f6" },
  { name: "MongoDB", cat: "Cloud & Databases", color: "#10b981" },
  { name: "Power BI", cat: "Data & Analytics", color: "#eab308" },
  { name: "Data Visualization", cat: "Data & Analytics", color: "#ec4899" },
  { name: "OOP", cat: "Engineering & Concepts", color: "#818cf8" },
  { name: "DSA", cat: "Engineering & Concepts", color: "#c084fc" },
  { name: "API Integration", cat: "Engineering & Concepts", color: "#2dd4bf" },
  { name: "GitHub", cat: "Engineering & Concepts", color: "#cbd5e1" },
];

export const Skills3DCloud: React.FC<Skills3DCloudProps> = ({
  selectedCategory,
  activeSkill,
  onSelectSkill
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Create a 3D Fibonacci sphere distribution for all 19 skills
    const skillGroup = new THREE.Group();
    scene.add(skillGroup);

    // Helper to create text badge sprite
    const createTextSprite = (text: string, colorHex: string, isHighlighted: boolean) => {
      const c = document.createElement('canvas');
      c.width = 320;
      c.height = 84;
      const ctx = c.getContext('2d')!;
      
      // Rounded card pill background
      ctx.fillStyle = isHighlighted ? 'rgba(14, 165, 233, 0.45)' : 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = isHighlighted ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = isHighlighted ? 3 : 1.5;
      
      const r = 24;
      ctx.beginPath();
      ctx.roundRect(8, 8, 304, 68, r);
      ctx.fill();
      ctx.stroke();

      // Dot accent
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.arc(36, 42, 9, 0, Math.PI * 2);
      ctx.fill();

      // Text label
      ctx.fillStyle = isHighlighted ? '#ffffff' : '#e2e8f0';
      ctx.font = 'bold 24px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 56, 42);

      const texture = new THREE.CanvasTexture(c);
      texture.colorSpace = THREE.SRGBColorSpace;
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.38, 1);
      return { sprite, texture, material: spriteMat };
    };

    const count = ALL_SKILLS.length;
    const radius = 2.8;
    const phi = Math.PI * (Math.sqrt(5) - 1); // golden ratio

    const spritesData: {
      sprite: THREE.Sprite;
      texture: THREE.CanvasTexture;
      material: THREE.SpriteMaterial;
      name: string;
      category: string;
      pos: THREE.Vector3;
    }[] = [];

    ALL_SKILLS.forEach((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x * radius, y * radius, z * radius);

      const isMatch = selectedCategory === 'All' || selectedCategory === skill.cat;
      const { sprite, texture, material } = createTextSprite(skill.name, skill.color, isMatch);
      sprite.position.copy(pos);
      skillGroup.add(sprite);

      spritesData.push({
        sprite,
        texture,
        material,
        name: skill.name,
        category: skill.cat,
        pos
      });
    });

    // Connective Constellation Lattice Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    // Connect adjacent nodes
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (spritesData[i].pos.distanceTo(spritesData[j].pos) < 2.2) {
          linePoints.push(
            spritesData[i].pos.x, spritesData[i].pos.y, spritesData[i].pos.z,
            spritesData[j].pos.x, spritesData[j].pos.y, spritesData[j].pos.z
          );
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    skillGroup.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.1);

      targetRotY += 0.22 * delta + mouseX * 0.4 * delta;
      targetRotX = THREE.MathUtils.damp(targetRotX, mouseY * 0.45, 3.0, delta);

      skillGroup.rotation.y = THREE.MathUtils.damp(skillGroup.rotation.y, targetRotY, 3.5, delta);
      skillGroup.rotation.x = THREE.MathUtils.damp(skillGroup.rotation.x, targetRotX, 3.5, delta);

      // Pulse sprites subtly
      const time = clock.getElapsedTime();
      spritesData.forEach((item, idx) => {
        const isCatMatch = selectedCategory === 'All' || selectedCategory === item.category;
        const isSkillMatch = activeSkill === item.name;
        
        const baseScale = isSkillMatch ? 1.7 : isCatMatch ? 1.4 : 1.0;
        const currentScale = baseScale + Math.sin(time * 2 + idx) * 0.04;
        item.sprite.scale.set(currentScale, currentScale * 0.27, 1);
        item.material.opacity = isSkillMatch ? 1.0 : isCatMatch ? 0.9 : 0.35;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      resizeObserver.disconnect();
      lineGeo.dispose();
      lineMat.dispose();
      spritesData.forEach(s => {
        s.texture.dispose();
        s.material.dispose();
      });
      renderer.dispose();
    };
  }, [selectedCategory, activeSkill]);

  return (
    <div className="relative w-full h-[400px] md:h-[460px] rounded-2xl overflow-hidden glass-panel border border-slate-800/80">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[11px] text-slate-400 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 pointer-events-none">
        <span>3D Skill Universe (19 Verified Competencies)</span>
        <span className="text-cyan-400">Interactive WebGL Sphere</span>
      </div>
    </div>
  );
};
