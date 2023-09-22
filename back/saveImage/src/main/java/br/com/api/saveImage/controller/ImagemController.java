package br.com.api.saveImage.controller;

import br.com.api.saveImage.dto.ImagemDTO;
import br.com.api.saveImage.entities.ImagemEntity;
import br.com.api.saveImage.repository.ImagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/imagens")
public class ImagemController {

    @Autowired
    private ImagemRepository imagemRepository;

    @PostMapping
    public ResponseEntity<?> salvarImagem(@RequestParam("imagem") MultipartFile imagem) throws IOException {
        ImagemEntity novaImagem = new ImagemEntity();
        novaImagem.setNome(imagem.getOriginalFilename());
        novaImagem.setDados(imagem.getBytes());
        ImagemEntity imagemSalva = imagemRepository.save(novaImagem);
        ImagemDTO imagemDTO = new ImagemDTO();
        imagemDTO.setId(imagemSalva.getId());
        return ResponseEntity.ok().body(imagemDTO);
    }

    //remover essa bagaça daqui
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<?> recuperarImagem(@PathVariable Long id) {
        Optional<ImagemEntity> imagemOptional = imagemRepository.findById(id);
        if (imagemOptional.isPresent()) {
            ImagemEntity imagem = imagemOptional.get();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagem.getDados());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccessControlAllowMethods(Arrays.asList(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.OPTIONS));
        headers.setAccessControlAllowHeaders(Arrays.asList("Authorization", "Origin", "Content-Type", "Accept"));
        headers.setAccessControlAllowOrigin("http://localhost:3000/");
        headers.setAccessControlAllowCredentials(true);

        return ResponseEntity.ok().headers(headers).build();
    }
}
