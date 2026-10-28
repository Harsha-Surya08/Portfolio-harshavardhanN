import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, Minimize2, Play, Pause, Sliders, Eye, RefreshCw } from 'lucide-react';

interface Hero3DCanvasProps {
  onExploreProjects?: () => void;
  onContactMe?: () => void;
}

// Module-scope reusable math vectors for zero GC pressure in render loop
const _tempVec3 = new THREE.Vector3();
const _mouseTarget = new THREE.Vector2(0, 0);

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive Bottom Dock State
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [colorTheme, setColorTheme] = useState<'cyan' | 'purple' | 'emerald' | 'amber'>('cyan');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [cameraPreset, setCameraPreset] = useState<'default' | 'core' | 'orbital' | 'top'>('default');

  // Mutable refs to pass into the animation loop without restarting WebGL
  const animStateRef = useRef({
    exploded: 0,
    rotating: true,
    speed: 1,
    theme: 'cyan',
    targetCamPos: new THREE.Vector3(0, 0.4, 4.6),
    mouse: { x: 0, y: 0 }
  });

  // Keep animStateRef in sync with React state
  useEffect(() => {
    animStateRef.current.exploded = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    animStateRef.current.rotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    animStateRef.current.speed = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    animStateRef.current.theme = colorTheme;
  }, [colorTheme]);

  // Handle camera presets
  useEffect(() => {
    if (cameraPreset === 'default') {
      animStateRef.current.targetCamPos.set(0, 0.4, 4.6);
    } else if (cameraPreset === 'core') {
      animStateRef.current.targetCamPos.set(0, 0.1, 2.8);
    } else if (cameraPreset === 'orbital') {
      animStateRef.current.targetCamPos.set(3.2, 1.8, 3.2);
    } else if (cameraPreset === 'top') {
      animStateRef.current.targetCamPos.set(0, 4.8, 0.6);
    }
  }, [cameraPreset]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect software WebGL to adapt performance gracefully
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

    // Respect user reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animStateRef.current.rotating = false;
      setIsRotating(false);
    }

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      50
    );
    camera.position.set(0, 0.4, 4.6);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x020617, 0); // transparent background so dark cyber theme shines through
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 2. Studio Lighting Rig (Key, Fill, Rim)
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // 3. Composite 3D Subject Group: Cybernetic AI Quantum Core
    // Hierarchy:
    // mainGroup
    //  ├── coreNucleus (Central glowing sphere)
    //  ├── geodesicCage (Icosahedron wireframe lattice)
    //  ├── innerLattice (Dodecahedron accent)
    //  ├── ringEquatorialGroup (Horizontal data ring)
    //  ├── ringPolarGroup (Tilted polar gyro ring)
    //  ├── satellitesGroup (Orbiting satellite nodes)
    //  ├── particlesMesh (Floating AI matrix constellation)
    //  └── groundShadow (Contact shadow plane)

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Color definitions for themes
    const themePalettes = {
      cyan: {
        primary: 0x06b6d4,
        accent: 0x38bdf8,
        glow: 0x0284c7,
        satellite: 0x67e8f9
      },
      purple: {
        primary: 0xa855f7,
        accent: 0xc084fc,
        glow: 0x7e22ce,
        satellite: 0xe9d5ff
      },
      emerald: {
        primary: 0x10b981,
        accent: 0x34d399,
        glow: 0x059669,
        satellite: 0x6ee7b7
      },
      amber: {
        primary: 0xf59e0b,
        accent: 0xfbbf24,
        glow: 0xd97706,
        satellite: 0xfde68a
      }
    };

    // (A) Core Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.68, 32, 32);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: themePalettes.cyan.glow,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const coreNucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    mainGroup.add(coreNucleus);

    // (B) Geodesic Cage (Primary silhouette)
    const cageGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: themePalettes.cyan.accent,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.85
    });
    const geodesicCage = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(geodesicCage);

    // (C) Inner faceted crystalline accent
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      wireframe: true,
      roughness: 0.4,
      metalness: 0.8
    });
    const innerLattice = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerLattice);

    // (D) Equatorial Orbital Ring
    const ringEquatorialGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.024, 16, 80);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    ringEquatorialGroup.add(ringMesh1);

    // Segment nodes on Equatorial Ring
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const nodeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: themePalettes.cyan.accent });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(Math.cos(angle) * 1.65, 0, Math.sin(angle) * 1.65);
      nodeMesh.rotation.y = -angle;
      ringEquatorialGroup.add(nodeMesh);
    }
    mainGroup.add(ringEquatorialGroup);

    // (E) Polar / Gyroscopic Ring (Tilted)
    const ringPolarGroup = new THREE.Group();
    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.02, 16, 80);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.95,
      roughness: 0.2
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringPolarGroup.add(ringMesh2);
    mainGroup.add(ringPolarGroup);

    // (F) Orbiting Satellites (3 parts in a constellation)
    const satellitesGroup = new THREE.Group();
    const satelliteNodes: { mesh: THREE.Mesh; distance: number; speed: number; angle: number; tilt: number }[] = [];
    const satCount = 5;
    const satGeo = new THREE.DodecahedronGeometry(0.1, 0);

    for (let i = 0; i < satCount; i++) {
      const satMat = new THREE.MeshStandardMaterial({
        color: themePalettes.cyan.satellite,
        metalness: 0.8,
        roughness: 0.2
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(satMesh);
      satelliteNodes.push({
        mesh: satMesh,
        distance: 2.1 + (i % 3) * 0.35,
        speed: (0.4 + i * 0.15) * (i % 2 === 0 ? 1 : -1),
        angle: (i / satCount) * Math.PI * 2,
        tilt: (i - 2) * 0.35
      });
    }
    mainGroup.add(satellitesGroup);

    // (G) Ambient AI Data Particle Constellation
    const particleCount = isSoftwareGl ? 120 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7; // slight vertical compression
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // (H) Contact Grounding Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    // Procedural radial alpha texture for soft contact grounding
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const gradient = sCtx.createRadialGradient(64, 64, 4, 64, 64, 60);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
    gradient.addColorStop(0.4, 'rgba(15, 23, 42, 0.3)');
    gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
    sCtx.fillStyle = gradient;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.9;
    scene.add(groundShadow);

    // Pointer Interaction Handler (throttled)
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _mouseTarget.set(x * 0.35, y * 0.35);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Window Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 4. Silky Animation Render Loop with Exponential Damping
    let frameId = 0;
    const clock = new THREE.Clock();

    function renderLoop() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const state = animStateRef.current;

      // Update palette on theme change
      const currentPalette = themePalettes[state.theme as keyof typeof themePalettes] || themePalettes.cyan;
      if (cageMat.color.getHex() !== currentPalette.accent) {
        cageMat.color.setHex(currentPalette.accent);
        nucleusMat.emissive.setHex(currentPalette.glow);
        ringMat1.color.setHex(currentPalette.primary);
        particleMat.color.setHex(currentPalette.accent);
        keyLight.color.setHex(currentPalette.accent);
      }

      // Smooth camera interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, state.targetCamPos.x + _mouseTarget.x * 0.5, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, state.targetCamPos.y + _mouseTarget.y * 0.5, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, state.targetCamPos.z, 3.5, delta);
      camera.lookAt(0, 0, 0);

      // Rotation when active
      if (state.rotating) {
        const speed = state.speed;
        mainGroup.rotation.y += 0.35 * delta * speed;
        geodesicCage.rotation.x += 0.2 * delta * speed;
        geodesicCage.rotation.z += 0.15 * delta * speed;
        innerLattice.rotation.y -= 0.4 * delta * speed;
        innerLattice.rotation.x -= 0.25 * delta * speed;

        ringEquatorialGroup.rotation.y += 0.6 * delta * speed;
        ringPolarGroup.rotation.x += 0.5 * delta * speed;
        ringPolarGroup.rotation.z += 0.3 * delta * speed;

        particlesMesh.rotation.y += 0.08 * delta * speed;
      }

      // Smooth mouse tilt on mainGroup
      mainGroup.rotation.x = THREE.MathUtils.damp(mainGroup.rotation.x, _mouseTarget.y * 0.4, 4.0, delta);
      mainGroup.rotation.z = THREE.MathUtils.damp(mainGroup.rotation.z, -_mouseTarget.x * 0.4, 4.0, delta);

      // Exploded View kinematics: expand rings and satellites smoothly outward
      const targetExplode = state.exploded;
      const targetCageScale = 1.05 + targetExplode * 0.45;
      geodesicCage.scale.setScalar(THREE.MathUtils.damp(geodesicCage.scale.x, targetCageScale, 4.5, delta));

      const targetRing1Radius = 1.65 + targetExplode * 0.85;
      ringEquatorialGroup.scale.setScalar(THREE.MathUtils.damp(ringEquatorialGroup.scale.x, targetRing1Radius / 1.65, 4.5, delta));

      const targetRing2Radius = 1.85 + targetExplode * 1.15;
      ringPolarGroup.scale.setScalar(THREE.MathUtils.damp(ringPolarGroup.scale.x, targetRing2Radius / 1.85, 4.5, delta));

      // Orbiting satellites
      const time = clock.getElapsedTime() * state.speed;
      satelliteNodes.forEach((sat, i) => {
        const effDist = sat.distance + targetExplode * 1.1;
        const curAngle = sat.angle + time * sat.speed;
        sat.mesh.position.set(
          Math.cos(curAngle) * effDist,
          Math.sin(curAngle * 1.2 + sat.tilt) * (0.6 + targetExplode * 0.3),
          Math.sin(curAngle) * effDist
        );
        sat.mesh.rotation.x += 0.8 * delta;
        sat.mesh.rotation.y += 0.8 * delta;
      });

      // Pulse nucleus subtly
      const pulse = 1.0 + Math.sin(clock.getElapsedTime() * 2.2) * 0.035;
      coreNucleus.scale.setScalar(pulse);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    }

    frameId = requestAnimationFrame(renderLoop);

    // Cleanup resources properly
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      resizeObserver.disconnect();

      // Dispose Geometries & Materials
      nucleusGeo.dispose();
      nucleusMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[640px] md:h-[720px] lg:h-[780px] overflow-hidden select-none">
      {/* Three.js Isolated Canvas Mount */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Floating 3D Interaction Hint Badge (Top Right) */}
      <div className="absolute top-6 right-6 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        <span>Interactive 3D Core • Drag to Rotate & Inspect</span>
      </div>

      {/* Collapsible Bottom Control Dock (Compliant with Skill: Collapsible Bottom Dock with Zero Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-[840px] z-20 pointer-events-auto">
        {/* Toggle Button */}
        <div className="flex justify-center mb-1.5">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-300 hover:text-cyan-400 border-t border-x border-slate-700/60 transition-all shadow-lg backdrop-blur-md"
            aria-label={isDockCollapsed ? 'Expand 3D Controls Dock' : 'Collapse 3D Controls Dock'}
          >
            {isDockCollapsed ? (
              <>
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show 3D Dock</span>
                <Maximize2 className="w-3 h-3 ml-1" />
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-cyan-400" />
                <span>Zen Mode (Hide Dock)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body */}
        {!isDockCollapsed && (
          <div className="glass-panel rounded-2xl p-3 md:p-4 border border-cyan-500/20 shadow-2xl backdrop-blur-xl bg-slate-950/85">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-center text-xs">
              
              {/* Exploded View Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-slate-300 font-medium">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Sliders className="w-3.5 h-3.5" />
                    Exploded Architecture
                  </span>
                  <span className="font-mono text-[11px] text-cyan-400">
                    {Math.round(explodedFactor * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedFactor}
                  onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  aria-label="3D Core Exploded View Slider"
                />
              </div>

              {/* Camera Perspective Buttons */}
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-300 font-medium flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-cyan-300" />
                  Camera Angle
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(['default', 'core', 'orbital', 'top'] as const).map((cam) => (
                    <button
                      key={cam}
                      onClick={() => setCameraPreset(cam)}
                      className={`py-1 px-1.5 rounded text-[10px] font-medium uppercase tracking-wider transition-colors ${
                        cameraPreset === cam
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {cam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Holographic Theme Swatches */}
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-300 font-medium">Quantum Theme</span>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'cyan', label: 'Cyan', color: 'bg-cyan-400' },
                    { id: 'purple', label: 'Violet', color: 'bg-purple-400' },
                    { id: 'emerald', label: 'Matrix', color: 'bg-emerald-400' },
                    { id: 'amber', label: 'Gold', color: 'bg-amber-400' },
                  ].map((thm) => (
                    <button
                      key={thm.id}
                      onClick={() => setColorTheme(thm.id as any)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-all ${
                        colorTheme === thm.id
                          ? 'bg-slate-800 ring-1 ring-cyan-400 text-white'
                          : 'bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                      aria-label={`Switch theme to ${thm.label}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${thm.color}`}></span>
                      <span className="hidden sm:inline">{thm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rotation & Pacing Controls */}
              <div className="flex items-center justify-between md:justify-end gap-2 pt-1 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isRotating
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                  aria-label={isRotating ? 'Pause 3D rotation' : 'Resume 3D rotation'}
                >
                  {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRotating ? 'Rotating' : 'Paused'}</span>
                </button>

                <button
                  onClick={() => {
                    setRotationSpeed((prev) => (prev === 1 ? 1.8 : prev === 1.8 ? 0.5 : 1));
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700"
                  title="Toggle speed multiplier"
                >
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span>{rotationSpeed}x</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
