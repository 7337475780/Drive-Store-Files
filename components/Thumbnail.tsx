import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface Props {
  type: string;
  extension: string;
  url?: string;
  imgClassName?: string;
  className?: string;
}
const Thumbnail = ({
  type,
  extension,
  url = "",
  imgClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension != "svg";
  return (
    <figure className={cn("thumbnail flex-center", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imgClassName,
          isImage && "thumbnail-image"
        )}
      />
    </figure>
  );
};

export default Thumbnail;
