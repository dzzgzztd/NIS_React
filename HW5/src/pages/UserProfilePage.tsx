import React, { useState } from "react";
import {
    Typography,
    Avatar,
    Card,
    CardContent,
    Container,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/Store";
import { updateUser } from "../Store/slices/UserSlice";

const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleSave = () => {
        dispatch(updateUser(updatedUser));
        setIsEditing(false);
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ marginTop: 15, padding: 2, boxShadow: 3, textAlign: "center" }}>
                <CardContent>
                    {/* Аватар */}
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar sx={{ width: 120, height: 120 }} src={user.avatar} alt="Аватар пользователя" />
                    </Box>

                    {/* Информация о пользователе */}
                    <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
                    <Typography variant="body1" color="textSecondary">{user.email}</Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                        Группа: {user.group}
                    </Typography>

                    <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                        Редактировать профиль
                    </Button>
                </CardContent>
            </Card>

            {/* Модальное окно для редактирования */}
            <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Редактировать профиль</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Имя"
                        value={updatedUser.name}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Ссылка на аватар"
                        value={updatedUser.avatar}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, avatar: e.target.value })}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditing(false)} color="secondary">Отмена</Button>
                    <Button onClick={handleSave} color="primary">Сохранить</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserProfilePage;
