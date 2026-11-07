import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-skills-globe',
  templateUrl: './skills-globe.html',
  styleUrl: './skills-globe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsGlobe implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  private readonly renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly world = new THREE.Group();
  private readonly logos: THREE.Sprite[] = [];
  private readonly logoGroups: THREE.Group[] = [];
  private readonly logoLabels = new Map<THREE.Sprite, THREE.Sprite>();
  private readonly logoBaseScales = new Map<THREE.Sprite, { x: number; y: number }>();
  private hoveredLogo?: THREE.Sprite;
  private dragging = false;
  private lastPointer = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private resizeObserver?: ResizeObserver;
  private animationFrame = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.className = 'skills-globe__canvas';
    canvas.replaceWith(this.renderer.domElement);
    this.camera.position.z = 8.2;
    this.scene.add(this.world);
    this.createGlobe();
    this.createLogos();
    this.bindPointerEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.renderer.domElement.parentElement!);
    this.resize();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.unbindPointerEvents();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private createGlobe(): void {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.35, 28, 20),
      new THREE.MeshBasicMaterial({
        color: 0x091522,
      }),
    );
    const wireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.4, 2),
      new THREE.MeshBasicMaterial({
        color: 0x24779a,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
        depthWrite: false,
      }),
    );
    sphere.renderOrder = 0;
    wireframe.renderOrder = 1;
    this.world.add(sphere, wireframe);
  }

  private createLogos(): void {
    const logoPaths = [
      'java.svg',
      'openjdk.svg',
      'spring.svg',
      'php.svg',
      'laravel.svg',
      'nodejs.svg',
      'python.svg',
      'angular.svg',
      'typescript.svg',
      'javascript.svg',
      'react.svg',
      'html5.svg',
      'css3.svg',
      'sass.svg',
      'tailwind.svg',
      'vite.svg',
      'figma.svg',
      'docker.svg',
      'jenkins.svg',
      'nginx.svg',
      'aws.svg',
      'linux.svg',
      'git.svg',
      'junit.svg',
    ];
    const logoRadius = 2.48;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const loader = new THREE.TextureLoader();

    logoPaths.forEach((path, index) => {
      const texture = loader.load(`/skills/${path}`);
      texture.colorSpace = THREE.SRGBColorSpace;
      const logo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      const baseScale = index === 0 ? { x: 0.9, y: 1.05 } : { x: 0.5, y: 0.5 };

      if (index === 0) {
        logo.position.set(0, 0, logoRadius);
      } else {
        const remainingLogos = logoPaths.length - 1;
        const normalizedHeight = 1 - ((index - 0.5) / remainingLogos) * 2;
        const horizontalRadius = Math.sqrt(1 - normalizedHeight ** 2);
        const angle = goldenAngle * (index - 1);
        logo.position.set(
          logoRadius * horizontalRadius * Math.cos(angle),
          logoRadius * normalizedHeight,
          logoRadius * horizontalRadius * Math.sin(angle),
        );
      }
      const logoGroup = new THREE.Group();
      logoGroup.position.copy(logo.position);
      logoGroup.lookAt(logoGroup.position.clone().multiplyScalar(2));
      logo.position.set(0, 0, 0);
      logo.renderOrder = 2;
      logo.scale.set(baseScale.x, baseScale.y, 1);
      this.logos.push(logo);
      this.logoBaseScales.set(logo, baseScale);
      logoGroup.add(logo);

      const label = this.createLogoLabel(path.replace('.svg', ''));
      label.position.set(0, index === 0 ? -0.82 : -0.42, 0.08);
      label.renderOrder = 3;
      label.visible = false;
      this.logoLabels.set(logo, label);
      logoGroup.add(label);
      this.logoGroups.push(logoGroup);
      this.world.add(logoGroup);
    });
  }

  private createLogoLabel(fileName: string): THREE.Sprite {
    const names: Record<string, string> = {
      openjdk: 'OpenJDK',
      spring: 'Spring Boot',
      java: 'Java',
      php: 'PHP',
      laravel: 'Laravel',
      nodejs: 'Node.js',
      python: 'Python',
      angular: 'Angular',
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      react: 'React',
      html5: 'HTML5',
      css3: 'CSS3',
      sass: 'Sass',
      tailwind: 'Tailwind CSS',
      vite: 'Vite',
      figma: 'Figma',
      docker: 'Docker',
      jenkins: 'Jenkins',
      nginx: 'NGINX',
      aws: 'AWS',
      linux: 'Linux',
      git: 'Git',
      junit: 'JUnit',
    };
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Não foi possível criar o canvas do nome da tecnologia.');
    }

    context.font = 'bold 26px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#f8fafc';
    context.fillText(names[fileName] ?? fileName, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    label.scale.set(0.82, 0.16, 1);
    return label;
  }

  private bindPointerEvents(): void {
    const canvas = this.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerUp);
    canvas.addEventListener('pointerleave', this.onPointerUp);
  }

  private unbindPointerEvents(): void {
    const canvas = this.renderer.domElement;
    canvas.removeEventListener('pointerdown', this.onPointerDown);
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerup', this.onPointerUp);
    canvas.removeEventListener('pointercancel', this.onPointerUp);
    canvas.removeEventListener('pointerleave', this.onPointerUp);
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    this.dragging = true;
    this.lastPointer = { x: event.clientX, y: event.clientY };
    this.velocity = { x: 0, y: 0 };
    this.renderer.domElement.setPointerCapture(event.pointerId);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.updateJavaLogoHover(event);

    if (!this.dragging) {
      return;
    }

    const deltaX = event.clientX - this.lastPointer.x;
    const deltaY = event.clientY - this.lastPointer.y;
    this.velocity = {
      x: deltaY * 0.006,
      y: deltaX * 0.006,
    };
    this.world.rotation.x += this.velocity.x;
    this.world.rotation.y += this.velocity.y;
    this.lastPointer = { x: event.clientX, y: event.clientY };
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    this.dragging = false;
    this.hoveredLogo = undefined;
    this.hideLogoLabels();
    if (this.renderer.domElement.hasPointerCapture(event.pointerId)) {
      this.renderer.domElement.releasePointerCapture(event.pointerId);
    }
  };

  private animate(): void {
    this.animationFrame = requestAnimationFrame(() => this.animate());

    this.updateLogoVisibility();

    this.logos.forEach((logo) => {
      const baseScale = this.logoBaseScales.get(logo);
      if (!baseScale) {
        return;
      }
      const targetScale = logo === this.hoveredLogo ? 1.12 : 1;
      logo.scale.x += (baseScale.x * targetScale - logo.scale.x) * 0.16;
      logo.scale.y += (baseScale.y * targetScale - logo.scale.y) * 0.16;
    });

    if (!this.dragging) {
      this.world.rotation.y += 0.001;
      this.world.rotation.x += this.velocity.x;
      this.world.rotation.y += this.velocity.y;
      this.velocity.x *= 0.94;
      this.velocity.y *= 0.94;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private updateLogoVisibility(): void {
    this.logoGroups.forEach((group, index) => {
      const worldPosition = new THREE.Vector3();
      group.getWorldPosition(worldPosition);
      const opacity = THREE.MathUtils.clamp((worldPosition.z + 0.2) / 0.65, 0, 1);
      this.setSpriteOpacity(this.logos[index], opacity);

      const label = this.logoLabels.get(this.logos[index]);
      if (label?.visible) {
        this.setSpriteOpacity(label, opacity);
      }
    });
  }

  private setSpriteOpacity(sprite: THREE.Sprite, opacity: number): void {
    const material = sprite.material;
    if (Array.isArray(material)) {
      return;
    }

    material.opacity = opacity;
    material.transparent = true;
    material.needsUpdate = true;
  }

  private updateJavaLogoHover(event: PointerEvent): void {
    if (this.dragging) {
      this.hoveredLogo = undefined;
      this.hideLogoLabels();
      return;
    }

    const bounds = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.hoveredLogo = this.raycaster.intersectObjects(this.logos, false)[0]?.object as
      | THREE.Sprite
      | undefined;
    this.hideLogoLabels();
    if (this.hoveredLogo) {
      this.logoLabels.get(this.hoveredLogo)!.visible = true;
    }
  }

  private hideLogoLabels(): void {
    this.logoLabels.forEach((label) => {
      label.visible = false;
    });
  }

  private resize(): void {
    const container = this.renderer.domElement.parentElement;
    if (!container) {
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
}
