import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = "qora-ai";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);

export async function uploadToAzureBlob(fileBuffer: Buffer, fileName: string, folder?: string) {
  const blobName = folder ? `${folder}/${fileName}` : fileName;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(fileBuffer);
  return blockBlobClient.url;
}

export async function listPDFFiles(prefix: string) {
  const pdfFiles: { name: string; url: string }[] = [];

  for await (const blob of containerClient.listBlobsFlat({ prefix })) {
    if (blob.name.toLowerCase().endsWith(".pdf")) {
      const blobClient = containerClient.getBlobClient(blob.name);
      pdfFiles.push({ name: blob.name, url: blobClient.url });
    }
  }

  return pdfFiles;
}

export async function downloadBlobToBuffer(blobName: string): Promise<Buffer> {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const downloadResponse = await blockBlobClient.download();
  const chunks: Uint8Array[] = [];

  for await (const chunk of downloadResponse.readableStreamBody!) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}