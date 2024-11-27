import { CodeIcon as PythonCode, SquareArrowOutUpRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CodeFileDisplayProps = {
    filename: string; // The name to display for the file
    file: File | Blob | string; // The file to be downloaded
};

export function CodeFileDisplay({ filename, file }: CodeFileDisplayProps) {

    const handleDownload = () => {
        let downloadUrl: string;

        if (file instanceof File || file instanceof Blob) {
            // Create a URL for the Blob/File
            downloadUrl = URL.createObjectURL(file);
        } else if (typeof file === 'string') {
            // If file is a URL
            downloadUrl = file;
        } else {
            console.error('Unsupported file type');
            return;
        }

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename; // Ensure the download attribute is set
        link.click();

        // Revoke Blob URLs after download
        if (file instanceof File || file instanceof Blob) {
            URL.revokeObjectURL(downloadUrl);
        }
    };
    return (
        <Card className="bg-black text-white rounded-lg w-full max-w-md border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between mb-2 pt-2 pr-2 pl-2">
                <div className="flex items-center gap-2">
                    <PythonCode className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">{filename}.ipynb</span>
                </div>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={handleDownload}>
                    <SquareArrowOutUpRight className="w-4 h-4" />
                    <span className="sr-only">Download</span>
                </Button>
            </div>
            <div className="relative">
                <pre className="text-sm overflow-hidden bg-zinc-900 p-2 rounded-bl-lg rounded-br-lg" style={{ maxHeight: '3.6em' }}>
                    <code>
                        import numpy as np<br/>
                        import pandas as pd
                    </code>
                </pre>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
            </div>
        </Card>
    )
}
