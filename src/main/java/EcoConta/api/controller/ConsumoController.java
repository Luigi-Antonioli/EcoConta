package EcoConta.api.controller;

import EcoConta.api.model.Consumo;
import EcoConta.api.service.ConsumoService;
import EcoConta.api.service.KNNService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/consumo")
@CrossOrigin(origins = "*")
public class ConsumoController {

    private final ConsumoService consumoService;
    private final KNNService knnService;

    public ConsumoController(ConsumoService consumoService, KNNService knnService) {
        this.consumoService = consumoService;
        this.knnService = knnService;
    }

    @PostMapping
    public ResponseEntity<Consumo> salvar(@RequestBody Consumo consumo) {
        return ResponseEntity.ok(consumoService.salvar(consumo));
    }

    @GetMapping
    public ResponseEntity<List<Consumo>> listarTodos() {
        return ResponseEntity.ok(consumoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consumo> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(consumoService.buscarPorId(id));
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<Consumo>> buscarPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {

        return ResponseEntity.ok(consumoService.buscarPorPeriodo(inicio, fim));
    }

    @GetMapping("/classificar")
    public ResponseEntity<String> classificar(
            @RequestParam double agua,
            @RequestParam double energia) {

        String perfil = knnService.classificarPerfil(agua, energia);
        String recomendacao = knnService.gerarRecomendacao(perfil);

        return ResponseEntity.ok(
                "Perfil: " + perfil + " | " + recomendacao
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        consumoService.deletar(id);
        return ResponseEntity.noContent().build();

        
    }
    
}