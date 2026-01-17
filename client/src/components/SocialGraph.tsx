import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
  repos: number;
}

interface GraphLink {
  source: string;
  target: string;
  commonFollowing: number;
}

interface SocialGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  isLoading?: boolean;
  onNodeClick?: (nodeId: string) => void;
  isMobile?: boolean;
}

export function SocialGraph({
  nodes,
  links,
  isLoading,
  onNodeClick,
  isMobile = false,
}: SocialGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  // 简化的图谱渲染（使用 Canvas）
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0 || isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 计算节点位置（使用简单的圆形布局）
    const nodePositions: Record<string, { x: number; y: number }> = {};
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2;
      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * radius * zoom + pan.x,
        y: centerY + Math.sin(angle) * radius * zoom + pan.y,
      };
    });

    // 清空画布
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制连线
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    links.forEach(link => {
      const source = nodePositions[link.source];
      const target = nodePositions[link.target];
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();

        // 绘制连线标注
        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        ctx.fillStyle = '#f59e0b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${link.commonFollowing}`, midX, midY - 5);
      }
    });

    // 绘制节点
    nodes.forEach(node => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      // 节点大小根据粉丝数变化
      const nodeSize = Math.max(15, Math.min(40, 15 + (node.followers / 100)));

      // 绘制节点圆圈
      ctx.fillStyle = '#165dff';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // 绘制节点边框
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制节点标签
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.name.substring(0, 3), pos.x, pos.y + 4);
    });
  }, [nodes, links, zoom, pan, isLoading]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  // 处理拖拽
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startPan = { ...pan };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setPan({
        x: startPan.x + deltaX,
        y: startPan.y + deltaY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">社交图谱</h3>
        <Skeleton className="w-full h-96" />
      </Card>
    );
  }

  if (nodes.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p>暂无图谱数据</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">社交图谱</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleZoomIn}
            size="sm"
            variant="outline"
            title="放大"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleZoomOut}
            size="sm"
            variant="outline"
            title="缩小"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          {isMobile && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="sm"
              variant="outline"
              title="展开/收起"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div
          ref={containerRef}
          className="relative w-full bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{ height: isMobile ? '300px' : '500px' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          />
        </div>
      )}

      {isMobile && !isExpanded && (
        <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 text-sm">
          点击"展开"查看完整图谱
        </div>
      )}

      {/* 图例 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">图例：</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span>节点大小 = 粉丝数</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-gray-400" />
            <span>连线 = 关注关系</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-semibold">数字</span>
            <span>= 共同关注数</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
