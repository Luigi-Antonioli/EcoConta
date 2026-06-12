package EcoConta.api.repository;

import EcoConta.api.model.Consumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ConsumoRepository extends JpaRepository<Consumo, Long> {

    List<Consumo> findByData(LocalDate data);

    List<Consumo> findByDataBetween(LocalDate inicio, LocalDate fim);

    List<Consumo> findByConsumoAguaGreaterThan(Double consumoAgua);

    List<Consumo> findByConsumoEnergiaGreaterThan(Double consumoEnergia);
}