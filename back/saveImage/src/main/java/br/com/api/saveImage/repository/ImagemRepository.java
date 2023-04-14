package br.com.api.saveImage.repository;


import br.com.api.saveImage.entities.ImagemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemRepository extends JpaRepository<ImagemEntity, Long> {
}
