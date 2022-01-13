function removeBackground(){

    const imagesList = [
        "data:image/jpeg;base64,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"
      ];
      
      imagesList.forEach((imageUrl) => {
        const image = new Image();
        image.onload = ({ target }) => {
          const w = Math.round(target.width);
          const h = Math.round(target.height);
      
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const canvasContext = canvas.getContext("2d");
          canvasContext.drawImage(
            target,
            0,
            0,
            target.width,
            target.height,
            0,
            0,
            w,
            h
          );
      
          const canvasImageData = canvasContext.getImageData(0, 0, w, h);
      
          for (
            let index = 0, dataLength = canvasImageData.data.length;
            index < dataLength;
            index += 4
          ) {
            const r = canvasImageData.data[index];
            const g = canvasImageData.data[index + 1];
            const b = canvasImageData.data[index + 2];
            if ([r, g, b].every((item) => item > 230))
              canvasImageData.data[index + 3] = 0;
          }
      
          target.width = w;
          target.height = h;
          canvasContext.putImageData(canvasImageData, 0, 0);
          document.body.append(image, canvas);
        };
        image.crossOrigin = "";
        image.src = imageUrl;
      });
}

