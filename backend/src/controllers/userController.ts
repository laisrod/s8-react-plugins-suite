import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { IUser, CreateUserDTO, UpdateUserDTO, ApiResponse } from '../types/index.js';

// GET /api/users - Listar todos
export const getAllUsers = async (
  req: Request,
  res: Response<ApiResponse<IUser[]>>
): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// GET /api/users/:id - Buscar um por ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IUser>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findById(id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// POST /api/users - Criar novo
export const createUser = async (
  req: Request<Record<string, never>, ApiResponse<IUser>, CreateUserDTO>,
  res: Response<ApiResponse<IUser>>
): Promise<void> => {
  try {
    const userData: CreateUserDTO = req.body;
    const newUser = new User(userData);
    const savedUser: IUser = await newUser.save();
    
    res.status(201).json({
      success: true,
      data: savedUser,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// PUT /api/users/:id - Atualizar
export const updateUser = async (
  req: Request<{ id: string }, ApiResponse<IUser>, UpdateUserDTO>,
  res: Response<ApiResponse<IUser>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdateUserDTO = req.body;
    
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'Usuário atualizado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// DELETE /api/users/:id - Deletar
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<{ message: string }>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser: IUser | null = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: { message: 'Usuário deletado com sucesso' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// Garantir que o arquivo é tratado como módulo ES
export {};