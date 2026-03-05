import { Node, Edge } from 'reactflow';

export const roadmapNodes: Node[] = [
  { id: 'frontend',        type: 'custom', position: { x: 400, y: 0 },    data: { label: 'Front-end',               variant: 'spine' } },
  { id: 'internet',        type: 'custom', position: { x: 400, y: 100 },  data: { label: 'Internet',                variant: 'spine' } },
  { id: 'html',            type: 'custom', position: { x: 400, y: 250 },  data: { label: 'HTML',                    variant: 'spine' } },
  { id: 'css',             type: 'custom', position: { x: 400, y: 330 },  data: { label: 'CSS',                     variant: 'spine' } },
  { id: 'javascript',      type: 'custom', position: { x: 400, y: 410 },  data: { label: 'JavaScript',              variant: 'spine' } },
  { id: 'version-control', type: 'custom', position: { x: 400, y: 530 },  data: { label: 'Version Control',         variant: 'spine' } },
  { id: 'vcs-hosting',     type: 'custom', position: { x: 400, y: 630 },  data: { label: 'VCS Hosting',             variant: 'spine' } },
  { id: 'pkg-managers',    type: 'custom', position: { x: 700, y: 630 },  data: { label: 'Package Managers',        variant: 'spine' } },
  { id: 'css-frameworks',  type: 'custom', position: { x: 700, y: 730 },  data: { label: 'CSS Frameworks',          variant: 'spine' } },
  { id: 'learn-framework', type: 'custom', position: { x: 400, y: 780 },  data: { label: 'Learn a Framework',       variant: 'spine' } },
  { id: 'ai-assisted',     type: 'custom', position: { x: 400, y: 930 },  data: { label: 'AI Assisted Coding',      variant: 'spine' } },
  { id: 'prompting',       type: 'custom', position: { x: 400, y: 1030 }, data: { label: 'Prompting Techniques',    variant: 'spine' } },
  { id: 'agents',          type: 'custom', position: { x: 400, y: 1110 }, data: { label: 'Agents',                  variant: 'spine' } },
  { id: 'mcp',             type: 'custom', position: { x: 400, y: 1190 }, data: { label: 'MCP',                     variant: 'spine' } },
  { id: 'skills',          type: 'custom', position: { x: 400, y: 1270 }, data: { label: 'Skills',                  variant: 'spine' } },

  { id: 'how-internet',    type: 'custom', position: { x: 750, y: 20 },   data: { label: 'How does the Internet work?', variant: 'side' } },
  { id: 'http',            type: 'custom', position: { x: 750, y: 80 },   data: { label: 'What is HTTP?',           variant: 'side' } },
  { id: 'domain-name',     type: 'custom', position: { x: 750, y: 140 },  data: { label: 'What is Domain Name?',    variant: 'side' } },
  { id: 'hosting',         type: 'custom', position: { x: 750, y: 200 },  data: { label: 'What is Hosting?',        variant: 'side' } },
  { id: 'dns',             type: 'custom', position: { x: 750, y: 260 },  data: { label: 'DNS and how it works?',   variant: 'side' } },
  { id: 'browser',         type: 'custom', position: { x: 750, y: 320 },  data: { label: 'Browsers and how they work?', variant: 'side' } },
  { id: 'git',             type: 'custom', position: { x: 100, y: 530 },  data: { label: 'Git',                     variant: 'side' } },
  { id: 'github',          type: 'custom', position: { x: 100, y: 630 },  data: { label: 'GitHub',                  variant: 'side' } },
  { id: 'gitlab',          type: 'custom', position: { x: 100, y: 690 },  data: { label: 'GitLab',                  variant: 'side' } },
  { id: 'npm',             type: 'custom', position: { x: 950, y: 580 },  data: { label: 'npm',                     variant: 'side' } },
  { id: 'yarn',            type: 'custom', position: { x: 950, y: 640 },  data: { label: 'yarn',                    variant: 'side' } },
  { id: 'pnpm',            type: 'custom', position: { x: 950, y: 700 },  data: { label: 'pnpm',                    variant: 'side' } },
  { id: 'bun',             type: 'custom', position: { x: 950, y: 760 },  data: { label: 'Bun',                     variant: 'side' } },
  { id: 'tailwind',        type: 'custom', position: { x: 950, y: 820 },  data: { label: 'Tailwind',                variant: 'side' } },
  { id: 'react',           type: 'custom', position: { x: 100, y: 780 },  data: { label: 'React',                   variant: 'side' } },
  { id: 'vue',             type: 'custom', position: { x: 100, y: 840 },  data: { label: 'Vue.js',                  variant: 'side' } },
  { id: 'angular',         type: 'custom', position: { x: 100, y: 900 },  data: { label: 'Angular',                 variant: 'side' } },
  { id: 'svelte',          type: 'custom', position: { x: 100, y: 960 },  data: { label: 'Svelte',                  variant: 'side' } },
  { id: 'solid',           type: 'custom', position: { x: 100, y: 1020 }, data: { label: 'SolidJS',                 variant: 'side' } },
  { id: 'copilot',         type: 'custom', position: { x: 100, y: 930 },  data: { label: 'GitHub Copilot',          variant: 'side' } },
  { id: 'cursor',          type: 'custom', position: { x: 100, y: 990 },  data: { label: 'Cursor',                  variant: 'side' } },
  { id: 'claude',          type: 'custom', position: { x: 100, y: 1050 }, data: { label: 'Claude Code',             variant: 'side' } },
];

export const roadmapEdges: Edge[] = [
  // Spine
  { id: 'e1',  source: 'frontend',        target: 'internet',        sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e2',  source: 'internet',        target: 'html',            sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e3',  source: 'html',            target: 'css',             sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e4',  source: 'css',             target: 'javascript',      sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e5',  source: 'javascript',      target: 'version-control', sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e6',  source: 'version-control', target: 'vcs-hosting',     sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e7',  source: 'pkg-managers',    target: 'css-frameworks',  sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e8',  source: 'javascript',      target: 'learn-framework', sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e9',  source: 'learn-framework', target: 'ai-assisted',     sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e10', source: 'ai-assisted',     target: 'prompting',       sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e11', source: 'prompting',       target: 'agents',          sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e12', source: 'agents',          target: 'mcp',             sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e13', source: 'mcp',             target: 'skills',          sourceHandle: 'bottom', targetHandle: 'top', data: { variant: 'solid' } },
  { id: 'e14', source: 'vcs-hosting',     target: 'pkg-managers',    sourceHandle: 'right',  targetHandle: 'left-target', data: { variant: 'solid' } },

  // Internet right branches
  { id: 'e15', source: 'internet', target: 'how-internet', sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e16', source: 'internet', target: 'http',         sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e17', source: 'internet', target: 'domain-name',  sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e18', source: 'internet', target: 'hosting',      sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e19', source: 'internet', target: 'dns',          sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e20', source: 'internet', target: 'browser',      sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },

  // Version control left
  { id: 'e21', source: 'version-control', target: 'git',    sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },

  // VCS hosting left
  { id: 'e22', source: 'vcs-hosting', target: 'github', sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e23', source: 'vcs-hosting', target: 'gitlab', sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },

  // Package managers right
  { id: 'e24', source: 'pkg-managers', target: 'npm',  sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e25', source: 'pkg-managers', target: 'yarn', sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e26', source: 'pkg-managers', target: 'pnpm', sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },
  { id: 'e27', source: 'pkg-managers', target: 'bun',  sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },

  // CSS frameworks right
  { id: 'e28', source: 'css-frameworks', target: 'tailwind', sourceHandle: 'right', targetHandle: 'left-target', data: { variant: 'dashed' } },

  // Learn framework left
  { id: 'e29', source: 'learn-framework', target: 'react',   sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e30', source: 'learn-framework', target: 'vue',     sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e31', source: 'learn-framework', target: 'angular', sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e32', source: 'learn-framework', target: 'svelte',  sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e33', source: 'learn-framework', target: 'solid',   sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },

  // AI assisted left
  { id: 'e34', source: 'ai-assisted', target: 'copilot', sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e35', source: 'ai-assisted', target: 'cursor',  sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
  { id: 'e36', source: 'ai-assisted', target: 'claude',  sourceHandle: 'left', targetHandle: 'right-target', data: { variant: 'dashed' } },
];