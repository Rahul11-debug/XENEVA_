import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Artifact3DViewer({ category = "Unknown" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x001833, 1.5);
    scene.add(ambient);

    const neonLight = new THREE.PointLight(0x00f3ff, 3, 10);
    neonLight.position.set(2, 2, 2);
    scene.add(neonLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 2, 10);
    purpleLight.position.set(-2, -1, 1);
    scene.add(purpleLight);

    let geometry;
    switch (category) {
      case "Weapon":
        geometry = new THREE.ConeGeometry(0.8, 2, 6);
        break;
      case "Navigation":
        geometry = new THREE.SphereGeometry(0.9, 32, 32);
        break;
      case "Communication":
        geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        break;
      case "Ritual":
        geometry = new THREE.OctahedronGeometry(1);
        break;
      case "Technology":
        geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        break;
      case "Biology":
        geometry = new THREE.TorusKnotGeometry(0.6, 0.25, 128, 16);
        break;
      default:
        geometry = new THREE.IcosahedronGeometry(0.9, 0);
    }

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      opacity: 0.15,
      transparent: true,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.setScalar(1.05);
    scene.add(wireMesh);

    const mat = new THREE.MeshPhongMaterial({
      color: 0x001833,
      emissive: 0x003344,
      specular: 0x00f3ff,
      shininess: 120,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    let isDragging = false,
      prevX = 0,
      prevY = 0,
      rotX = 0,
      rotY = 0;
    let targetRotX = 0,
      targetRotY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.01;
      targetRotX += (e.clientY - prevY) * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      isDragging = true;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      targetRotY += (e.touches[0].clientX - prevX) * 0.01;
      targetRotX += (e.touches[0].clientY - prevY) * 0.01;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onWheel = (e) => {
      camera.position.z = Math.max(
        1.5,
        Math.min(6, camera.position.z + e.deltaY * 0.005),
      );
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onMouseUp);
    el.addEventListener("wheel", onWheel, { passive: true });

    let frame;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      mesh.rotation.x = rotX + t * 0.1;
      mesh.rotation.y = rotY + t * 0.15;
      wireMesh.rotation.x = rotX + t * 0.12;
      wireMesh.rotation.y = rotY + t * 0.18;
      particles.rotation.y = t * 0.05;

      const pulse = Math.sin(t * 2) * 0.5 + 0.5;
      neonLight.intensity = 2 + pulse * 2;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth,
        nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [category]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-xenova-blue/50 font-orbitron tracking-widest pointer-events-none">
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
    </div>
  );
}
