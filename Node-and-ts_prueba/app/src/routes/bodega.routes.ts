import { Router } from 'express';
import * as BodegaController from '../controllers/bodega.controller';
import { validateDto } from '../middlewares/validateDto.middleware';
import { authenticate } from '../middlewares/authenticate.middleware';
import { CreateBodegaDto, UpdateBodegaDto } from '../dtos/bodega.dto';

const router = Router();

/**
 * @swagger
 * /bodegas:
 *   get:
 *     summary: Obtener lista de todas las bodegas
 *     tags: [Bodegas]
 *     responses:
 *       200:
 *         description: Lista de bodegas obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BodegaDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', BodegaController.getBodegas);

/**
 * @swagger
 * /bodegas:
 *   post:
 *     summary: Crear una nueva bodega
 *     tags: [Bodegas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBodegaDto'
 *     responses:
 *       201:
 *         description: Bodega creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BodegaDto'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authenticate, validateDto(CreateBodegaDto), BodegaController.createBodega);

/**
 * @swagger
 * /bodegas/{id_bodega}:
 *   get:
 *     summary: Obtener bodega por ID
 *     tags: [Bodegas]
 *     parameters:
 *       - in: path
 *         name: id_bodega
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la bodega
 *     responses:
 *       200:
 *         description: Bodega obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BodegaDto'
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id_bodega', authenticate, BodegaController.getBodegaById);

/**
 * @swagger
 * /bodegas/{id_bodega}:
 *   put:
 *     summary: Actualizar bodega existente
 *     tags: [Bodegas]
 *     parameters:
 *       - in: path
 *         name: id_bodega
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la bodega a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBodegaDto'
 *     responses:
 *       200:
 *         description: Bodega actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BodegaDto'
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id_bodega', authenticate, validateDto(UpdateBodegaDto), BodegaController.updateBodega);

/**
 * @swagger
 * /bodegas/{id_bodega}:
 *   delete:
 *     summary: Eliminar bodega (soft delete)
 *     tags: [Bodegas]
 *     parameters:
 *       - in: path
 *         name: id_bodega
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la bodega a eliminar
 *     responses:
 *       200:
 *         description: Bodega eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bodega eliminada correctamente
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id_bodega', authenticate, BodegaController.deleteBodega);

/**
 * @swagger
 * /bodegas/search:
 *   get:
 *     summary: Buscar bodegas con filtros (nombre, ubicación)
 *     tags: [Bodegas]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nombre
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtro por ubicación
 *     responses:
 *       200:
 *         description: Resultados de búsqueda de bodegas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BodegaDto'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search', authenticate, BodegaController.searchBodegas);

export default router;
