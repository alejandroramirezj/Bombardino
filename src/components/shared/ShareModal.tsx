import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  title: string;
  url: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ title, url, onClose }) => {
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('¡Enlace copiado al portapapeles!');
    }).catch(() => {
      toast.error('No se pudo copiar el enlace');
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir</DialogTitle>
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              className="absolute top-2 right-2 p-2 h-auto rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="flex-1" onClick={shareToTwitter}>
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" className="flex-1" onClick={shareToFacebook}>
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Copiar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal; 