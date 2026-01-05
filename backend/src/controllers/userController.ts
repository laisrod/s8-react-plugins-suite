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

    // Validação básica
    if (!userData.first || !userData.last || !userData.email) {
      res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: first, last e email são necessários'
      });
      return;
    }

    // Limpar campos opcionais vazios
    const cleanedData: CreateUserDTO = {
      first: userData.first.trim(),
      last: userData.last.trim(),
      email: userData.email.trim().toLowerCase(),
    };

    if (userData.phone?.trim()) {
      cleanedData.phone = userData.phone.trim();
    }
    if (userData.location?.trim()) {
      cleanedData.location = userData.location.trim();
    }
    if (userData.hobby?.trim()) {
      cleanedData.hobby = userData.hobby.trim();
    }

    const newUser = new User(cleanedData);
    const savedUser: IUser = await newUser.save();
    
    res.status(201).json({
      success: true,
      data: savedUser,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    let errorMessage = 'Erro ao criar usuário';
    
    if (error instanceof Error) {
      // Tratamento de erros específicos do Mongoose
      if (error.name === 'ValidationError') {
        const validationError = error as any;
        const fieldErrors = Object.keys(validationError.errors || {}).map(
          (key) => `${key}: ${validationError.errors[key].message}`
        );
        errorMessage = fieldErrors.length > 0 
          ? `Erro de validação: ${fieldErrors.join(', ')}`
          : `Erro de validação: ${error.message}`;
      } else if (error.name === 'MongoServerError' && (error as any).code === 11000) {
        errorMessage = 'Email já está em uso. Por favor, use outro email.';
      } else {
        errorMessage = error.message;
      }
    }

    console.error('Erro ao criar usuário:', {
      error,
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : 'Unknown',
      userData: req.body
    });
    
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