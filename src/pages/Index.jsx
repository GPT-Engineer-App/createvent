import React, { useState } from "react";
import { Container, VStack, Button, Input, Textarea, Heading, Box, IconButton, useToast, List, ListItem, ListIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const toast = useToast();

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, newEvent]);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Added",
      description: "Your event has been added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (index) => {
    setNewEvent(events[index]);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedEvents = events.map((event, index) => {
      if (index === editIndex) {
        return newEvent;
      }
      return event;
    });
    setEvents(updatedEvents);
    setEditIndex(-1);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        <Heading mb={4}>Event Manager</Heading>
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="Event Name" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Event Description" />
          </FormControl>
          <Button leftIcon={editIndex === -1 ? <FaPlus /> : <FaSave />} colorScheme="blue" mt={4} onClick={editIndex === -1 ? handleAddEvent : handleSaveEdit}>
            {editIndex === -1 ? "Add Event" : "Save Changes"}
          </Button>
        </Box>
        <List spacing={3}>
          {events.map((event, index) => (
            <ListItem key={`event-${index}`} p={3} boxShadow="md">
              <Heading size="md">{event.name}</Heading>
              <Text>{event.description}</Text>
              <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEdit(index)} />
              <IconButton aria-label="Delete" icon={<FaTrash />} ml={2} onClick={() => handleDelete(index)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
