package EcoConta.api.service;

import EcoConta.api.model.Consumo;
import EcoConta.api.repository.ConsumoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ConsumoService {

    private final ConsumoRepository consumoRepository;

    public ConsumoService(ConsumoRepository consumoRepository) {
        this.consumoRepository = consumoRepository;
    }

    public Consumo salvar(Consumo consumo) {
        return consumoRepository.save(consumo);
    }

    public List<Consumo> listarTodos() {
        return consumoRepository.findAll();
    }

    public Consumo buscarPorId(Long id) {
        return consumoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consumo não encontrado com id: " + id));
    }

    public List<Consumo> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return consumoRepository.findByDataBetween(inicio, fim);
    }

    public void deletar(Long id) {
        if (!consumoRepository.existsById(id)) {
            throw new RuntimeException("Consumo não encontrado para exclusão");
        }
        consumoRepository.deleteById(id);
    }
}