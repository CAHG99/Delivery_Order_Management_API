import { Router } from 'express';
import {BodegaController} from '../controllers/bodega.controller';
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
router.get('/', BodegaController.findAll);

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
 *       500:
 *         description: Error al crear la bodega
 */
router.post('/', validateDto(CreateBodegaDto),BodegaController.create);

/**
 * @swagger
 * /bodegas/{id}:
 *   put:
 *     summary: Actualizar una bodega existente
 *     tags: [Bodegas]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Error al actualizar la bodega
 */
router.put('/:id',validateDto(UpdateBodegaDto),BodegaController.update);

/**
 * @swagger
 * /bodegas/{id}:
 *   delete:
 *     summary: Eliminar (soft delete) una bodega
 *     tags: [Bodegas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la bodega a eliminar
 *     responses:
 *       200:
 *         description: Bodega eliminada (soft delete)
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error al eliminar la bodega
 */
router.delete('/:id', BodegaController.softDelete);
